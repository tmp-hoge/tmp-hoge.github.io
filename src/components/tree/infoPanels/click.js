import React from "react";
import { isValueValid } from "../../../util/globals";
import { infoPanelStyles } from "../../../globalStyles";
import { numericToCalendar } from "../../../util/dateHelpers";
import { getTraitFromNode, getFullAuthorInfoFromNode, getVaccineFromNode, getAccessionFromNode, getUrlFromNode } from "../../../util/treeMiscHelpers";

export const styles = {
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "all",
    top: 0,
    left: 0,
    zIndex: 2000,
    backgroundColor: "rgba(80, 80, 80, .20)",
    /* FLEXBOX */
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    wordWrap: "break-word",
    wordBreak: "break-word"
  }
};

export const stopProp = (e) => {
  if (!e) {e = window.event;} // eslint-disable-line no-param-reassign
  e.cancelBubble = true;
  if (e.stopPropagation) {e.stopPropagation();}
};

/* min width to get "collection date" on 1 line: 120 */
const item = (key, value, href) => (
  <tr key={key}>
    <th style={infoPanelStyles.item}>{key}</th>
    <td style={infoPanelStyles.item}>{href ? (
      <a href={href} target="_blank" rel="noopener noreferrer">{value}</a>
    ) :
      value
    }</td>
  </tr>
);

const formatURL = (url) => {
  if (url !== undefined && url.startsWith("https_")) {
    return url.replace("https_", "https:");
  } else if (url !== undefined && url.startsWith("http_")) {
    return url.replace("http_", "http:");
  }
  return url;
};

const Link = ({url, title, value}) => (
  <tr>
    <th style={infoPanelStyles.item}>{title}</th>
    <td style={infoPanelStyles.item}>
      <a href={url} target="_blank" rel="noopener noreferrer">{value}</a>
    </td>
  </tr>
);

const AccessionAndUrl = ({node}) => {
  const accession = getAccessionFromNode(node);
  const url = getUrlFromNode(node);
  const genbank_accession = getTraitFromNode(node, "genbank_accession");

  /* `gisaid_epi_isl` is a special value attached to nodes introduced during the 2019 nCoV outbreak.
  If set, the display is different from the normal behavior */
  const gisaid_epi_isl = getTraitFromNode(node, "gisaid_epi_isl");
  if (isValueValid(gisaid_epi_isl)) {
    return (
      <>
        <Link title={"GISAID EPI ISL"} value={gisaid_epi_isl.split("_")[2]} url={"https://gisaid.org"}/>
        {isValueValid(genbank_accession) ?
          <Link title={"Genbank accession"} value={genbank_accession} url={"https://www.ncbi.nlm.nih.gov/nuccore/" + genbank_accession}/> :
          null
        }
      </>
    );
  }

  if (isValueValid(genbank_accession)) {
    return (
      <Link title={"Genbank accession"} value={genbank_accession} url={"https://www.ncbi.nlm.nih.gov/nuccore/" + genbank_accession}/>
    );
  } else if (isValueValid(accession) && isValueValid(url)) {
    return (
      <Link url={formatURL(url)} value={accession} title={"Accession"}/>
    );
  } else if (isValueValid(accession)) {
    return (
      item("Accession", accession)
    );
  } else if (isValueValid(url)) {
    return (
      <Link title={"Strain URL"} url={formatURL(url)} value={"click here"}/>
    );
  }
  return null;
};


const VaccineInfo = ({node}) => {
  const vaccineInfo = getVaccineFromNode(node);
  if (!vaccineInfo) return null;
  const renderElements = [];
  if (vaccineInfo.selection_date) {
    renderElements.push(
      <tr key={"seldate"}>
        <th>Vaccine selected</th>
        <td>{vaccineInfo.selection_date}</td>
      </tr>
    );
  }
  if (vaccineInfo.start_date) {
    renderElements.push(
      <tr key={"startdate"}>
        <th>Vaccine start date</th>
        <td>{vaccineInfo.start_date}</td>
      </tr>
    );
  }
  if (vaccineInfo.end_date) {
    renderElements.push(
      <tr key={"enddate"}>
        <th>Vaccine end date</th>
        <td>{vaccineInfo.end_date}</td>
      </tr>
    );
  }
  if (vaccineInfo.serum) {
    renderElements.push(
      <tr key={"serum"}>
        <th>Serum strain</th>
        <td/>
      </tr>
    );
  }
  return renderElements;
};

const PublicationInfo = ({node}) => {
  const info = getFullAuthorInfoFromNode(node);
  if (!info) return null;

  const itemsToRender = [];
  itemsToRender.push(item("Authors", info.value));
  if (info.title && info.title !== "?") {
    if (info.paper_url && info.paper_url !== "?") {
      itemsToRender.push(item("Title", info.title, info.paper_url));
    } else {
      itemsToRender.push(item("Title", info.title));
    }
  }
  if (info.journal && info.journal !== "?") {
    itemsToRender.push(item("Journal", info.journal));
  }
  return (itemsToRender.length === 1 ? itemsToRender[0] : itemsToRender);
};

const StrainName = ({children}) => (
  <p style={infoPanelStyles.modalHeading}>{children}</p>
);

const SampleDate = ({node}) => {
  const date = getTraitFromNode(node, "num_date");
  if (!date) return null;

  const dateUncertainty = getTraitFromNode(node, "num_date", {confidence: true});
  if (date && dateUncertainty && dateUncertainty[0] !== dateUncertainty[1]) {
    return (
      <>
        {item("Inferred collection date", numericToCalendar(date))}
        {item("Collection date confidence", `(${numericToCalendar(dateUncertainty[0])}, ${numericToCalendar(dateUncertainty[1])})`)}
      </>
    );
  }

  return item("Collection date", numericToCalendar(date));
};

const getTraitsToDisplay = (node) => {
  // TODO -- this should be centralised somewhere
  if (!node.node_attrs) return [];
  const ignore = ["author", "div", "num_date", "gisaid_epi_isl", "genbank_accession"];
  return Object.keys(node.node_attrs).filter((k) => !ignore.includes(k));
};

const Trait = ({node, trait, colorings}) => {
  const value_tmp = getTraitFromNode(node, trait);
  let value = value_tmp;
  if (typeof value_tmp == "number"){
    if (!Number.isInteger(value_tmp)){
      value = Number.parseFloat(value_tmp).toPrecision(3);
    }
  }
  const name = (colorings && colorings[trait] && colorings[trait].title) ?
    colorings[trait].title :
    trait;
  return isValueValid(value) ? item(name, value) : null;
};

/**
 * A React component to display information about a tree tip in a modal-overlay style
 * @param  {Object}   props
 * @param  {Object}   props.tip              tip node selected
 * @param  {function} props.goAwayCallback
 * @param  {object}   props.colorings
 */
const TipClickedPanel = ({tip, goAwayCallback, colorings}) => {
  if (!tip) {return null;}
  const panelStyle = { ...infoPanelStyles.panel};
  panelStyle.maxHeight = "70%";
  const node = tip.n;
  return (
    <div style={infoPanelStyles.modalContainer} onClick={() => goAwayCallback(tip)}>
      <div className={"panel"} style={panelStyle} onClick={(e) => stopProp(e)}>
        <StrainName>{node.name}</StrainName>
        <table>
          <tbody>
            <VaccineInfo node={node} />
            <SampleDate node={node}/>
            <PublicationInfo node={node}/>
            {getTraitsToDisplay(node).map((trait) => (
              <Trait node={node} trait={trait} colorings={colorings} key={trait}/>
            ))}
            <AccessionAndUrl node={node}/>
          </tbody>
        </table>
        <p style={infoPanelStyles.comment}>
          Click outside this box to go back to the tree
        </p>
      </div>
    </div>
  );
};

export default TipClickedPanel;
