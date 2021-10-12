import './index.css';
import * as echarts from 'echarts';
import {drawHeatmap} from './charts/heatmap';
import {drawScatterPlot} from './charts/scatter';


document.addEventListener("DOMContentLoaded", () => {
    const scatter = document.getElementById('scatter');
    if (scatter) {
        const scatterChart = echarts.init(scatter);
        drawScatterPlot(scatterChart);
    }

    const heatmap = document.getElementById('heatmap');
    if (heatmap) {
        const heatmapChart = echarts.init(heatmap);
        drawHeatmap(heatmapChart);
    }
});



