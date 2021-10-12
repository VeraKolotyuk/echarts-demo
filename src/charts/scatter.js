import * as d3 from 'd3';

export function drawScatterPlot(areaPiecesChart, symbolSize = 15) {
    d3.csv("sales.csv").then(function(data){
        let mapData = [];

        const quarters = [...new Set(data.map(item => {
            return item.Quarter;
        }))];

        quarters.forEach((q) => {
            const found = data.find(el => el.Quarter === q);
            mapData.push(found.BasketValue);
        });

        let option = {
            xAxis: { data: quarters, axisLabel: {show: true,  color: '#fd8000'}},
            yAxis: {position: 'right', axisLabel: {show: true}},
            legend: {orient: 'horizontal',
                right: 0,
                top: 0},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                textStyle: {
                    fontSize: 16
                }
            },
            title: {
                left: 'center',
                text: 'Scatterplot'
            },
            series: [
                {
                    name: 'Basket Value',
                    symbolSize,
                    data: mapData,
                    type: 'scatter'
                }
            ]
        };

        option && areaPiecesChart.setOption(option);
    })
}