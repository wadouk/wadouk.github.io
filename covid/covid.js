fetch('pctgrowcovid.csv')
  .then(r => r.text())
  .then(t => {
    const d = t.split('\n').filter(Boolean).map(v => v.split(',')).slice(1)
    const countries = d.reduce((a, b) => a.add(b[1].replace(/\"/g, "")), new Set())

    var ctx = document.getElementById('myChart').getContext('2d')

    const c = new Chart(ctx, {
      type: 'line',
      options: {
        animation: {
          duration: 0,
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: '% croissance',
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Date',
            },
          }],
        },
      },
    })


    const selectPays = document.getElementById('pays');

    function toOptionNode(v) {
      const o = document.createElement('option')
      o.appendChild(document.createTextNode(v))
      return o
    }

    Array.from(countries.values()).sort().forEach(e => selectPays.appendChild(toOptionNode(e)))

    selectPays.addEventListener('change', (e) => {
      displayDataForCountry(selectPays.value)
    })

    let limitYElem = document.getElementById('limity')

    function toggleScaleofYAxe(v) {
      window.localStorage.setItem('limity', v)
      if (v) {
        c.options.scales.yAxes[0].ticks.min = -0.5
        c.options.scales.yAxes[0].ticks.max = 1
      } else {
        c.options.scales.yAxes[0].ticks = {}
      }

      c.update()
    }

    limitYElem.addEventListener('click', (e) => {
      toggleScaleofYAxe(e.target.checked)
    })

    function displayDataForCountry(p) {
      window.localStorage.setItem('pays', p)
      const data = d.filter((v => v[1].indexOf(p) !== -1))
      c.data.labels = data.map(v => v[0])
      c.data.datasets = [{
        label: 'Mortalité',
        data: data.map(v => v[5]),
        fill: false,
        borderColor: 'lightBlue',
        options: {},
      }, {
        label: 'moyenne mobile sur 7 jours',
        data: data.map(v => v[7]),
        fill: false,
        borderColor: 'blue',
        options: {},
      }]
      c.update()
    }

    limitYElem.checked = window.localStorage.getItem('limity') === 'true';
    selectPays.value =  window.localStorage.getItem('pays')
    displayDataForCountry(selectPays.value)
    toggleScaleofYAxe(limitYElem.checked)


  })
