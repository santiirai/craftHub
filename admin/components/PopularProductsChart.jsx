import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PopularProductsChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);

      const option = {
        animation: false,
        tooltip: { trigger: 'item' },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
        },
        series: [
          {
            name: 'Popular Products',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold',
              },
            },
            labelLine: { show: false },
            data: [
              { value: 1048, name: 'Handmade Pottery' },
              { value: 735, name: 'Woven Baskets' },
              { value: 580, name: 'Jewelry' },
              { value: 484, name: 'Paintings' },
              { value: 300, name: 'Sculptures' },
            ],
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

export default PopularProductsChart;
