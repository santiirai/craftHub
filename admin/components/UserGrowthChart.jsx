import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const UserGrowthChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    const option = {
      animation: false,
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'New Users',
          type: 'bar',
          data: [30, 52, 65, 74, 80, 95, 110],
          itemStyle: {
            color: '#4F46E5',
          },
        },
      ],
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-md font-medium text-gray-700 mb-3">User Growth</h3>
      <div ref={chartRef} className="w-full h-64" />
    </div>
  );
};

export default UserGrowthChart;
