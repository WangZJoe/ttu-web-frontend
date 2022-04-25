let clearOption = { tooltip: { trigger: "axis" }, toolbox: { show: false,
feature: { mark: { show: true }, dataView: { show: true, readOnly: true },
magicType: { show: false, type: ["line", "bar"] }, restore: { show: true },
saveAsImage: { show: true } } }, calculable: true, xAxis: [ { type: "category",
boundaryGap: false, data: ["-20", "0", "20", "40"], axisTick: { show: false },
axisLine: { show: false }, splitLine: { show: false }, axisLabel: { textStyle: {
color: "rgb(142, 149, 170)" } } } ], yAxis: [ { type: "value", name: "°C",
axisLine: { show: false }, axisLabel: { textStyle: { color: "rgb(142, 149, 170)"
} }, splitLine: { lineStyle: { color: "rgb(232, 234, 238)" } } } ], series: [ {
name: "-", type: "line", data: [11, 11, 15, 13], symbolSize: 2, itemStyle: {
normal: { lineStyle: { color: "rgb(59, 236, 242)" }, borderWidth: 2,
borderColor: "rgb(59, 236, 242)" } } } ] }
