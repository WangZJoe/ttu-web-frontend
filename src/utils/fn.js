export default {
  //获取eharts图自适应宽高
  chartssize(container, charts) {
    // eslint-disable-next-line no-unused-vars
    function getStyle(el, _name) {
      if (window.getComputedStyle) {
        return window.getComputedStyle(el, null);
      } else {
        return el.currentStyle;
      }
    }
    var wi = getStyle(container, "width").width;
    var hi = getStyle(container, "height").height;
    charts.style.width = wi;
    charts.style.height = hi;
  },
};
