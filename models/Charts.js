// Creatures Chart
function creaturesChart() {
  var data = [];

  var options = {
    series: [
      {
        name: "Quantidade",
        data: data.slice(),
      },
    ],
    chart: {
      id: "realtime",
      height: 300,
      width: 400,
      type: "area",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Quantidade de criaturas",
      align: "left",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "numeric",
      range: 50,
    },
    legend: {
      show: false,
    },
  };

  var chart = new ApexCharts(document.querySelector("#creatures"), options);
  chart.render();

  window.setInterval(function () {
    data.push(creatures.length);

    chart.updateSeries([
      {
        data: data,
      },
    ]);
  }, dayTime);
}

// Colors Chart
function colorsChart() {
  const colors = ["#ffdbac", "#f1c27d", "#e0ac69", "#c68642", "#8d5524"];
  let data = [0, 0, 0, 0, 0];

  var options = {
    title: {
      text: "Quantidade por cor da pele",
      align: "left",
    },
    series: [
      {
        name: "Quantidade",
        data: data.slice(),
      },
    ],
    chart: {
      height: 300,
      width: 400,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        "Branco",
        ["Moreno", "Claro"],
        ["Moreno", "Médio"],
        ["Moreno", "Escuro"],
        "Negro",
      ],
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector("#colors"), options);
  chart.render();

  window.setInterval(function () {
    data = [0, 0, 0, 0, 0];
    creatures.map((creature) => {
      const color = creature.color;

      switch (JSON.stringify(color)) {
        case JSON.stringify({ r: 141, g: 85, b: 36 }):
          data[4] += 1;
          break;
        case JSON.stringify({ r: 198, g: 134, b: 66 }):
          data[3] += 1;
          break;
        case JSON.stringify({ r: 224, g: 172, b: 105 }):
          data[2] += 1;
          break;
        case JSON.stringify({ r: 241, g: 194, b: 125 }):
          data[1] += 1;
          break;
        case JSON.stringify({ r: 255, g: 219, b: 172 }):
          data[0] += 1;
          break;

        default:
          break;
      }
    });

    chart.updateSeries([
      {
        data: data,
      },
    ]);
  }, chartTime);
}

// Speed Chart
function speedChart() {
  var options = {
    title: {
      text: "Quantidade por velocidade",
      align: "left",
    },
    series: [0, 0, 0],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Rápido", "Médio", "Lerdo"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  var chart = new ApexCharts(document.querySelector("#speed"), options);
  chart.render();

  window.setInterval(function () {
    let data = [0, 0, 0];
    creatures.map((creature) => {
      const speed = creature.speed;

      switch (speed) {
        case 3:
          data[0] += 1;
          break;
        case 2:
          data[1] += 1;
          break;
        case 1:
          data[2] += 1;
          break;

        default:
          break;
      }
    });
    chart.updateSeries(data);
  }, chartTime);
}

creaturesChart();
colorsChart();
speedChart();
