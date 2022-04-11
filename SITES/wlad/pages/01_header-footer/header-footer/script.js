
const labels = [
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];
const labels2 = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'Temperatura',
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgb(255, 0, 0)',
    data: [30, 29, 28, 25, 22, 23],
  },
  {
    label: 'Umidade',
    backgroundColor: 'rgb(0, 0, 255)',
    borderColor: 'rgb(0, 0, 255)',
    data: [80, 82, 80, 85, 84, 83],
  }
  ]
};
const config = {
  type: 'line',
  data: data,
  options: {
    layout:{
      padding: 50
    },
    plugins:{
      title:{
        display: true, text: "Gráfico - Tempo Real",
        font:{
          weight: "bold",
          size: 24
        }

      }
    }
  }
}
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
