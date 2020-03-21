/* eslint no-param-reassign: off */

const marked = require('marked');
const yamlFront = require('yaml-front-matter');  /* https://www.npmjs.com/package/yaml-front-matter */
const utils = require("../utils");

const blockProxyHandler = {
  set: (target, key, value) => {
    if (key === "url") {
      const urlParts = value.match(/.*(nextstrain.org|localhost).*?\/+([^?\s]+)\??(\S*)/);
      target.dataset = urlParts[2];
      target.query = urlParts[3];
      return true;
    } else if (key === "contents") {
      target.__html = marked(value, {sanitize: false, gfm: true});
      return true;
    } else if (key === "mainDisplayMarkdown") {
      target[key] = value;
      return true;
    }
    return false;
  }
};

const makeFrontMatterBlock = (frontMatter) => {
  if (!frontMatter.title || !frontMatter.dataset) {
    throw new Error("Incorrectly formatted frontmatter in narrative file");
  }
  /* create markdown to represent the title page */
  const markdown = [];
  markdown.push(`# ${frontMatter.title}`);
  if (frontMatter.authors) {
    const authors = parseContributors(frontMatter, "authors", "authorLinks");
    if (authors) {
      markdown.push(`### Author: ${authors}`);
      if (frontMatter.affiliations && typeof frontMatter.affiliations === "string") {
        markdown[markdown.length-1] += " <sup> 1 </sup>";
        markdown.push(`<sup> 1 </sup> ${frontMatter.affiliations}`);
      }
    }
  }
  if (frontMatter.translators) {
    const translators = parseContributors(frontMatter, "translators", "translatorLinks");
    if (translators) {
      markdown.push(`### Translators: ${translators}`);
    }
  }
  if (frontMatter.date && typeof frontMatter.date === "string") {
    markdown.push(`### Created: ${frontMatter.date}`);
  }
  if (frontMatter.updated && typeof frontMatter.updated === "string") {
    markdown.push(`### Updated: ${frontMatter.updated}`);
  }
  if (frontMatter.abstract && typeof frontMatter.abstract === "string") {
    markdown.push(`#### ${frontMatter.abstract}`);
  }

  const block = new Proxy({}, blockProxyHandler);
  block.url = frontMatter.dataset;
  block.contents = markdown.join("\n");
  return block;
};

function parseContributors(frontMatter, contributorsKey, contributorLinksKey) {
  const contributors = frontMatter[contributorsKey];
  const contributorLinks = frontMatter[contributorLinksKey];

  if (Array.isArray(contributors)) {
    return parseContributorsArray(contributors, contributorLinks, contributorsKey, contributorLinksKey);
  } else if (typeof contributors === 'string') {
    return parseContributorsString(contributors, contributorLinks, contributorsKey, contributorLinksKey);
  }
  return undefined;
}

function parseContributorsArray(contributors, contributorLinks, contributorsKey, contributorLinksKey) {
  // validate links
  if (contributorLinks) {
    if (!Array.isArray(contributorLinks)) {
      utils.warn(`Narrative parsing - if ${contributorsKey} is an array, then ${contributorLinksKey} must also be an array. Skipping links.`);
      contributorLinks = undefined;
    } else if (contributorLinks.length !== contributors.length) {
      utils.warn(`Narrative parsing - the length of ${contributorsKey} and ${contributorLinksKey} did not match. Skipping links.`);
      contributorLinks = undefined;
    }
  }
  if (contributorLinks) {
    contributors = contributors.map((contributor, idx) => {
      return contributorLink(contributor, contributorLinks[idx]);
    });
  }
  return contributors.join(", ");
}

function parseContributorsString(contributors, contributorLinks, contributorsKey, contributorLinksKey) {
  // validate links
  if (contributorLinks) {
    if (typeof contributorLinks !== "string") {
      utils.warn(`Narrative parsing - if ${contributorsKey} is a string, then ${contributorLinksKey} must also be a string. Skipping links.`);
      contributorLinks = undefined;
    }
  }
  return contributorLink(contributors, contributorLinks);
}

function contributorLink(contributor, contributorLinkValue) {
  if (contributorLink) {
    return `[${contributor}](${contributorLinkValue})`;
  }
  return contributor;
}

/**
 * Extract a code-block from the content, if it exists, tagged as auspiceMainDisplayMarkdown
 * Which we send to the client under a special key for parsing in the main display
 * This functionality is experimental, undocumented & subject to change.
 * The implementation relies on regex matching, which is not the best long term solution.
 */
const extractAuspiceMainDisplayMarkdown = (paragraph) => {
  const groups = paragraph.match(/([\s\S]*)```auspiceMainDisplayMarkdown\n([\s\S]+)\n```([\s\S]*)/);
  if (!groups) return [paragraph, false];

  return [
    groups[1]+groups[3], // the content above & below the auspiceMainDisplayMarkdown block
    groups[2]            // the content within the auspiceMainDisplayMarkdown block
  ];
};

/**
 * parses text (from the narrative markdown file)
 * into blocks.
 * Returned object (blocks) has properties "__html", "dataset", "query"
 * and will be sent (in JSON form) to the client
 * @param {string} fileContents string representing the entire markdown file
 * @return {Array} Array of Objects. See `blockProxyHandler` for shape of each object.
 */
const parseNarrativeFile = (fileContents) => {
  const blocks = [];
  const frontMatter = yamlFront.loadFront(fileContents);

  const titlesAndParagraphs = frontMatter.__content
    .replace(/\r\n/g, "\n")                 // handle files with CRLF endings (windows)
    .split(/\n*[#\s]+(\[.+?\]\(.+?\))\n+/)  // matches titles defined as: # [title](url)
    .filter((e) => !e.match(/^\s*$/));      // remove empty paragraphs (often leading / trailing)

  /* process the frontmatter content */
  blocks.push(makeFrontMatterBlock(frontMatter));

  /* process the markdown content */
  const isTitle = (s) => s.match(/^\[.+?\]\(.+?\)$/);
  let idx = 0;
  while (idx < titlesAndParagraphs.length) {
    if (!isTitle(titlesAndParagraphs[idx])) {
      idx++; continue;
    }

    /* want to capture the following groups:
    title text (1st element) and URL, possibly including query (2nd element) */
    const matches = titlesAndParagraphs[idx].match(/\[(.+?)\]\((\S+)\)/);
    let paragraphContents = `# ${matches[1]}\n`; // the title text
    /* add in the next paragraph _if_ it's not itself a title */
    if (!isTitle(titlesAndParagraphs[++idx])) {
      paragraphContents += titlesAndParagraphs[idx++];
    }

    let mainDisplayMarkdown;
    [paragraphContents, mainDisplayMarkdown] = extractAuspiceMainDisplayMarkdown(paragraphContents);

    const block = new Proxy({}, blockProxyHandler);
    block.url = matches[2];
    block.contents = paragraphContents;
    if (mainDisplayMarkdown) block.mainDisplayMarkdown = mainDisplayMarkdown;
    blocks.push(block);
  }

  return blocks;
};


module.exports = {
  default: parseNarrativeFile
};
