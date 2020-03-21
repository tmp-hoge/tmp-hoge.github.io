import { timerFlush } from "d3-timer";
import { NODE_VISIBLE } from "../../../util/globals";

export const updateTipLabels = function updateTipLabels(dt) {
  if ("tipLabels" in this.groups) {
    this.groups.tipLabels.selectAll("*").remove();
  } else {
    this.groups.tipLabels = this.svg.append("g").attr("id", "tipLabels");
  }

  const tLFunc = this.callbacks.tipLabel;
  const xPad = this.params.tipLabelPadX;
  const yPad = this.params.tipLabelPadY;
  const inViewTerminalNodes = this.nodes
    .filter((d) => d.terminal)
    .filter((d) => d.inView);
  // console.log(`there are ${inViewTerminalNodes.length} nodes in view`)
  if (inViewTerminalNodes.length < this.params.tipLabelBreakL1) {

    let fontSize = this.params.tipLabelFontSizeL1;
    if (inViewTerminalNodes.length < this.params.tipLabelBreakL2) {
      fontSize = this.params.tipLabelFontSizeL2;
    }
    if (inViewTerminalNodes.length < this.params.tipLabelBreakL3) {
      fontSize = this.params.tipLabelFontSizeL3;
    }

    window.setTimeout(() => {
      this.groups.tipLabels
        .selectAll('.tipLabel')
        .data(inViewTerminalNodes)
        .enter()
        .append("text")
        .attr("x", (d) => d.xTip + xPad)
        .attr("y", (d) => d.yTip + yPad)
        .text((d) => tLFunc(d))
        .attr("class", "tipLabel")
        .style("font-size", fontSize.toString()+"px")
        .style('visibility', (d) => d.visibility === NODE_VISIBLE ? "visible" : "hidden");
    }, dt);
  }
};

export const removeTipLabels = function removeTipLabels() {
  if ("tipLabels" in this.groups) {
    this.groups.tipLabels.selectAll("*").remove();
  }
};

/** branchLabelSize
 * @param {str} key e.g. "aa" or "clade"
 * @return {str} font size of the branch label, e.g. "12px"
 */
const branchLabelSize = (key) => {
  if (key === "aa") return "10px";
  return "14px";
};

/** branchLabelFontWeight
 * @param {str} key e.g. "aa" or "clade"
 * @return {str} font weight of the branch label, e.g. "500"
 */
const branchLabelFontWeight = (key) => {
  if (key === "aa") return "500";
  return "700";
};

/** createBranchLabelVisibility (the return value should be passed to d3 style call)
 * @param {str} key e.g. "aa" or "clade"
 * @param {str} layout
 * @param {int} totalTipsInView visible tips also in view
 * @return {func||str} Returns either a string ("visible") or a function.
 *                     The function returned is handed nodes and returns either
 *                     "visible" or "hidden". This function should only be
 *                     provided nodes for which the label exists on that node.
 */
const createBranchLabelVisibility = (key, layout, totalTipsInView) => {
  if (key !== "aa") return "visible";
  const magicTipFractionToShowBranchLabel = 0.05;
  return (d) => {
    if (layout !== "rect") {
      return "hidden";
    }
    /* if any other labelling is defined on the branch, then show AA mutations */
    if (Object.keys(d.n.branch_attrs.labels).filter((k) => k!=="aa").length) {
      return "visible";
    }
    /* if the number of _visible_ tips descending from this node are over the
    magicTipFractionToShowBranchLabel (c/w the total numer of _visible_ and
    _inView_ tips then display the label */
    if (d.n.tipCount > magicTipFractionToShowBranchLabel * totalTipsInView) {
      return "visible";
    }
    return "hidden";
  };
};

export const updateBranchLabels = function updateBranchLabels(dt) {
  const visibility = createBranchLabelVisibility(this.params.branchLabelKey, this.layout, this.zoomNode.n.tipCount);
  const labelSize = branchLabelSize(this.params.branchLabelKey);
  const fontWeight = branchLabelFontWeight(this.params.branchLabelKey);
  this.groups.branchLabels
    .selectAll('.branchLabel')
    .transition().duration(dt)
    .attr("x", (d) => d.xTip - 5)
    .attr("y", (d) => d.yTip - this.params.branchLabelPadY)
    .style("visibility", visibility)
    .style("font-weight", fontWeight)
    .style("font-size", labelSize);
  if (!dt) timerFlush();
};

export const removeBranchLabels = function removeBranchLabels() {
  if ("branchLabels" in this.groups) {
    this.groups.branchLabels.selectAll("*").remove();
  }
};

export const drawBranchLabels = function drawBranchLabels(key) {
  /* salient props: this.zoomNode.n.tipCount, this.zoomNode.n.fullTipCount */
  this.params.branchLabelKey = key;
  const labelSize = branchLabelSize(key);
  const fontWeight = branchLabelFontWeight(key);
  const visibility = createBranchLabelVisibility(key, this.layout, this.zoomNode.n.tipCount);

  if (!("branchLabels" in this.groups)) {
    this.groups.branchLabels = this.svg.append("g").attr("id", "branchLabels");
  }
  this.groups.branchLabels
    .selectAll('.branchLabel')
    .data(this.nodes.filter(
      (d) => d.n.branch_attrs && d.n.branch_attrs.labels && d.n.branch_attrs.labels[key])
    )
    .enter()
    .append("text")
    .attr("class", "branchLabel")
    .attr("x", (d) => d.xTip + ((this.params.orientation[0]>0)?-5:5))
    .attr("y", (d) => d.yTip - this.params.branchLabelPadY)
    .style("text-anchor", (this.params.orientation[0]>0)?"end":"start")
    .style("visibility", visibility)
    .style("fill", this.params.branchLabelFill)
    .style("font-family", this.params.branchLabelFont)
    .style("font-weight", fontWeight)
    .style("font-size", labelSize)
    .text((d) => d.n.branch_attrs.labels[key]);
};
