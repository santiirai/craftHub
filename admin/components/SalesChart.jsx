import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const SalesChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);

      const option = {
        animation: false,
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: 'Sales',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210],
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(79, 70, 229, 0.6)' },
                  { offset: 1, color: 'rgba(79, 70, 229, 0.1)' },
                ],
              },
            },
            lineStyle: { color: '#4F46E5' },
            itemStyle: { color: '#4F46E5' },
          },
        ],
      };

      chartInstance.setOption(option);

      const handleResize = () => chartInstance.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} className="w-full h-64"></div>;
};

export default SalesChart;
