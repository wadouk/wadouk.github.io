fetch('pctgrowcovid.csv')
  .then(r => r.text())
  .then(t => {
    const data = t.split('\n').filter(Boolean).map(v => v.split(',')).slice(1)

    var ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(v => v[0]),
        datasets: [{
          label: 'pct croissance',
          data: data.map(v => v[5]),
          fill: false,
          borderColor: 'lightBlue',
          options: {}
        }, {
          label: 'moyenne mobile 7',
          data: data.map(v => v[7]),
          fill: false,
          borderColor: 'blue',
          options: {}
        }]
      },
    });
  })
