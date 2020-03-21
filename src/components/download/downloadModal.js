import React from "react";
import Mousetrap from "mousetrap";
import { connect } from "react-redux";
import { withTheme } from 'styled-components';
import { DISMISS_DOWNLOAD_MODAL } from "../../actions/types";
import { materialButton, extraLightGrey, infoPanelStyles } from "../../globalStyles";
import { stopProp } from "../tree/infoPanels/click";
import * as helpers from "./helperFunctions";
import * as icons from "../framework/svg-icons";
import { getAcknowledgments} from "../framework/footer";
import { createSummary } from "../info/info";

const RectangularTreeIcon = withTheme(icons.RectangularTree);
const PanelsGridIcon = withTheme(icons.PanelsGrid);
const MetaIcon = withTheme(icons.Meta);

const dataUsage = [
  `The data presented here is intended to rapidly disseminate analysis of important pathogens.
  Unpublished data is included with permission of the data generators, and does not impact their right to publish.`,
  `Please contact the respective authors (available via the TSV files below) if you intend to carry out further research using their data.
  Derived data, such as phylogenies, can be downloaded below - please contact the relevant authors where appropriate.`
];

export const publications = {
  nextstrain: {
    author: "Hadfield et al",
    title: "Nextstrain: real-time tracking of pathogen evolution",
    year: "2018",
    journal: "Bioinformatics",
    href: "https://doi.org/10.1093/bioinformatics/bty407"
  },
  treetime: {
    author: "Sagulenko et al",
    title: "TreeTime: Maximum-likelihood phylodynamic analysis",
    journal: "Virus Evolution",
    year: "2017",
    href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5758920/"
  },
  titers: {
    author: "Neher et al",
    titleJournalYear: "Prediction, dynamics, and visualization of antigenic phenotypes of seasonal influenza viruses",
    journal: "PNAS",
    year: "2016",
    href: "http://www.pnas.org/content/113/12/E1701.abstract"
  }
};

@connect((state) => ({
  browserDimensions: state.browserDimensions.browserDimensions,
  show: state.controls.showDownload,
  colorBy: state.controls.colorBy,
  metadata: state.metadata,
  tree: state.tree,
  nodes: state.tree.nodes,
  visibleStateCounts: state.tree.visibleStateCounts,
  filters: state.controls.filters,
  visibility: state.tree.visibility,
  panelsToDisplay: state.controls.panelsToDisplay,
  panelLayout: state.controls.panelLayout
}))
class DownloadModal extends React.Component {
  constructor(props) {
    super(props);
    this.getStyles = (bw, bh) => {
      return {
        behind: { /* covers the screen */
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "all",
          zIndex: 2000,
          backgroundColor: "rgba(80, 80, 80, .20)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          wordWrap: "break-word",
          wordBreak: "break-word"
        },
        title: {
          fontWeight: 500,
          fontSize: 32,
          marginTop: "20px",
          marginBottom: "20px"
        },
        secondTitle: {
          fontWeight: 500,
          marginTop: "0px",
          marginBottom: "20px"
        },
        modal: {
          marginLeft: 200,
          marginTop: 130,
          width: bw - (2 * 200),
          height: bh - (2 * 130),
          borderRadius: 2,
          backgroundColor: "rgba(250, 250, 250, 1)",
          overflowY: "auto"
        },
        break: {
          marginBottom: "10px"
        }
      };
    };
    this.dismissModal = this.dismissModal.bind(this);
  }
  componentDidMount() {
    Mousetrap.bind('d', () => {
      helpers.SVG(this.props.dispatch, this.getFilePrefix(), this.props.panelsToDisplay, this.props.panelLayout, this.makeTextStringsForSVGExport());
    });
  }
  getRelevantPublications() {
    const x = [publications.nextstrain, publications.treetime];
    if (["cTiter", "rb", "ep", "ne"].indexOf(this.props.colorBy) !== -1) {
      x.push(publications.titers);
    }
    return x;
  }
  formatPublications(pubs) {
    return (
      <span>
        <ul>
          {pubs.map((pub) => (
            <li key={pub.href}>
              <a href={pub.href} target="_blank" rel="noreferrer noopener">
                {pub.author}, {pub.title}, <i>{pub.journal}</i> ({pub.year})
              </a>
            </li>
          ))}
        </ul>
      </span>
    );
  }
  getFilePrefix() {
    return "nextstrain_"
      + window.location.pathname
          .replace(/^\//, '')       // Remove leading slashes
          .replace(/:/g, '-')       // Change ha:na to ha-na
          .replace(/\//g, '_');     // Replace slashes with spaces
  }
  makeTextStringsForSVGExport() {
    const x = [];
    x.push(this.props.metadata.title);
    x.push(`Last updated ${this.props.metadata.updated}`);
    const address = window.location.href.replace(/&/g, '&amp;');
    x.push(`Downloaded from <a href="${address}">${address}</a> on ${new Date().toLocaleString()}`);
    x.push(this.createSummaryWrapper());
    x.push("");
    x.push(dataUsage[0] + ` A full list of sequence authors is available via <a href="https://nextstrain.org">nextstrain.org</a>.`);
    x.push(`Relevant publications:`);
    this.getRelevantPublications().forEach((pub) => {
      x.push(`<a href="${pub.href}">${pub.author}, ${pub.title}, ${pub.journal} (${pub.year})</a>`);
    });
    return x;
  }

  downloadButtons() {
    const filePrefix = this.getFilePrefix();
    const iconWidth = 25;
    const buttons = [
      ["Tree (newick)", (<RectangularTreeIcon width={iconWidth} selected />), () => helpers.newick(this.props.dispatch, filePrefix, this.props.nodes[0], false)],
      ["TimeTree (newick)", (<RectangularTreeIcon width={iconWidth} selected />), () => helpers.newick(this.props.dispatch, filePrefix, this.props.nodes[0], true)],
      ["Strain Metadata (TSV)", (<MetaIcon width={iconWidth} selected />), () => helpers.strainTSV(this.props.dispatch, filePrefix, this.props.nodes, this.props.metadata.colorings)]
    ];
    if (helpers.areAuthorsPresent(this.props.tree)) {
      buttons.push(["Author Metadata (TSV)", (<MetaIcon width={iconWidth} selected />), () => helpers.authorTSV(this.props.dispatch, filePrefix, this.props.tree)]);
    }
    buttons.push(
      ["Screenshot (SVG)", (<PanelsGridIcon width={iconWidth} selected />), () => helpers.SVG(this.props.dispatch, filePrefix, this.props.panelsToDisplay, this.props.panelLayout, this.makeTextStringsForSVGExport())]
    );
    const buttonTextStyle = Object.assign({}, materialButton, {backgroundColor: "rgba(0,0,0,0)", paddingLeft: "10px", color: "white"});
    return (
      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {buttons.map((data) => (
          <div key={data[0]} onClick={data[2]} style={{cursor: 'pointer'}}>
            {data[1]}
            <button style={buttonTextStyle}>
              {data[0]}
            </button>
          </div>
        ))}
      </div>
    );
  }
  dismissModal() {
    this.props.dispatch({ type: DISMISS_DOWNLOAD_MODAL });
  }
  createSummaryWrapper() {
    return createSummary(
      this.props.metadata.mainTreeNumTips,
      this.props.nodes,
      this.props.filters,
      this.props.visibility,
      this.props.visibleStateCounts
    );
  }
  render() {
    if (!this.props.show) {
      return null;
    }
    const panelStyle = {...infoPanelStyles.panel};
    panelStyle.width = this.props.browserDimensions.width * 0.66;
    panelStyle.maxWidth = panelStyle.width;
    panelStyle.maxHeight = this.props.browserDimensions.height * 0.66;
    panelStyle.fontSize = 14;
    panelStyle.lineHeight = 1.4;

    const meta = this.props.metadata;
    return (
      <div style={infoPanelStyles.modalContainer} onClick={this.dismissModal}>
        <div style={panelStyle} onClick={(e) => stopProp(e)}>
          <p style={infoPanelStyles.topRightMessage}>
            (click outside this box to return to the app)
          </p>

          <div style={infoPanelStyles.modalSubheading}>
            {meta.title} (last updated {meta.updated})
          </div>

          <div>
            {this.createSummaryWrapper()}
          </div>
          <div style={infoPanelStyles.break}/>
          {" A full list of sequence authors is available via the TSV files below."}
          <div style={infoPanelStyles.break}/>
          {getAcknowledgments({}, {preamble: {fontWeight: 300}, acknowledgments: {fontWeight: 300}})}

          <div style={infoPanelStyles.modalSubheading}>
            Data usage policy
          </div>
          {dataUsage.join(" ")}

          <div style={infoPanelStyles.modalSubheading}>
            Please cite the authors who contributed genomic data (where relevant), as well as:
          </div>
          {this.formatPublications(this.getRelevantPublications())}


          <div style={infoPanelStyles.modalSubheading}>
            Download data:
          </div>
          {this.downloadButtons()}

        </div>
      </div>
    );
  }
}


export default DownloadModal;
