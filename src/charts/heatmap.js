import * as d3 from 'd3';

export function drawHeatmap(heatmap) {
    d3.csv("sales.csv").then(function (data) {
        let mapData = [];
        const quarters = [...new Set(data.map(item => {
            return item.Quarter;
        }))];

        const products = [...new Set(data.map(item => {
            return item.Products;
        }))];

        quarters.forEach((q, xi) => {
            products.forEach((p, yi) => {
                // Just for example take the first customer
                mapData.push([xi, yi, data.find((el => el.Quarter === q && el.Products === p)).BasketSize]);
            });
        })

        const maxSize = Math.max.apply(Math, data.map(item => {
                return item.BasketSize;
            })
        );

        let option = {
            tooltip: {},
            title: {
                left: 'center',
                text: 'Heatmap Chart'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {show: true}
                }
            },
            grid: {
                height: '50%',
                top: '10%'
            },
            xAxis: {
                type: 'category',
                data: quarters,
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                type: 'category',
                data: products,
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: 0,
                max: maxSize,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%',
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                }
            },
            series: [
                {
                    name: 'Basket Size',
                    type: 'heatmap',
                    data: mapData,
                    label: {
                        show: true
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        option && heatmap.setOption(option);
    })
}