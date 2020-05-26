fetch('pctgrowcovid.csv')
  .then(r => r.text())
  .then(t => {
    const d = t.split('\n').filter(Boolean).map(v => v.split(',')).slice(1)
    const countries = d.reduce((a, b) => a.add(b[1].replace(/\"/g, "")), new Set())

    const ctx = document.getElementById('myChart').getContext('2d')
    const ctx2 = document.getElementById('myChart2').getContext('2d')
    const ctx3 = document.getElementById('myChart3').getContext('2d')

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
              labelString: 'croissance'
            },
            ticks: {
              callback: (v, a, b) => {
                return `${v * 100} %`
              }
            },
            stacked: false,
          }, {
            position: 'right',
            stacked: false,
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
    const c3 = new Chart(ctx3, {
      type: 'line',
      options: {
        animation: {
          duration: 0,
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'croissance'
            },
            ticks: {
              callback: (v, a, b) => {
                return `${v * 100} %`
              }
            }
          }, {
            position: 'right',
            stacked: false,
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

    const c2 = new Chart(ctx2, {
      type: 'line',
      options: {
        animation: {
          duration: 0,
        },
        scales: {
          yAxes: [{
            type: 'logarithmic',
            ticks: {
              autoSkipPadding: 100,
              callback: (v, a, b) => {
                if (v > 1000) {
                  if (v > 1000000) {
                    return v / 1000000 + 'M'
                  }
                  return v / 1000 + 'k'
                }
                return v
              }
            }
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
        c.options.scales.yAxes[0].ticks = {...c.options.scales.yAxes[0].ticks , min: -0.5, max : 1}
        c3.options.scales.yAxes[0].ticks = {...c3.options.scales.yAxes[0].ticks , min: -0.5, max : 1}
      } else {
        c.options.scales.yAxes[0].ticks = {...c.options.scales.yAxes[0].ticks , min: undefined, max : undefined}
        c3.options.scales.yAxes[0].ticks = {...c3.options.scales.yAxes[0].ticks , min: undefined, max : undefined}
      }

      c.update()
      c3.update()
    }

    limitYElem.addEventListener('click', (e) => {
      toggleScaleofYAxe(e.target.checked)
    })

    let logScaleElem = document.getElementById('logscale')

    function toggleLogScale(v) {
      window.localStorage.setItem('logscale', v)
      c2.options.scales.yAxes[0].type = v ? 'logarithmic' : 'linear'

      c2.update()
    }

    logScaleElem.addEventListener('click', (e) => {
      toggleLogScale(e.target.checked)
    })

    function displayDataForCountry(p) {
      window.localStorage.setItem('pays', p)
      const data = d.filter((v => v[1].indexOf(p) !== -1))
      c.data.labels = data.map(v => v[0])
      c.data.datasets = [{
        label: 'Mortalité',
        data: data.map(v => v[5]),
        fill: false,
        yAxisID: 'y-axis-0',
        borderColor: 'lightBlue',
        options: {},
      }, {
        label: 'Mortalité (moy 7j)',
        data: data.map(v => v[7]),
        fill: false,
        borderColor: 'blue',
        yAxisID: 'y-axis-0',
        options: {},
      }, {
        label: 'Nouveau',
        data: data.map(v => v[4]),
        fill: false,
        yAxisID: 'y-axis-1',
        type: 'bar',
        backgroundColor: 'darkYellow',
        options: {},
      }]

      c3.data.labels = data.map(v => v[0])
      c3.data.datasets = [{
        label: 'Infections',
        data: data.map(v => v[11]),
        fill: false,
        borderColor: 'lightGreen',
        options: {},
      }, {
        label: 'Infections (moy 7j)',
        data: data.map(v => v[12]),
        fill: false,
        borderColor: 'green',
        options: {},
      }, {
        label: 'Nouveau',
        data: data.map(v => v[9]),
        fill: false,
        yAxisID: 'y-axis-1',
        type: 'bar',
        backgroundColor: 'darkYellow',
        options: {},
      }]
      c3.update()

      c2.data.labels = data.map(v => v[0])
      c2.data.datasets = [{
        label: 'Restant malade',
        data: data.map(v => v[14]),
        fill: false,
        borderColor: 'blue',
        options: {},
      }]
      c.update()
      c2.update()
    }

    if (window.localStorage.getItem('limity')) {
      limitYElem.checked = window.localStorage.getItem('limity') === 'true';
      toggleScaleofYAxe(limitYElem.checked)
    }
    if (window.localStorage.getItem('pays')) {
      selectPays.value =  window.localStorage.getItem('pays')
      displayDataForCountry(selectPays.value)
    }
    if (window.localStorage.getItem('logscale')) {
      logScaleElem.checked =  window.localStorage.getItem('logscale')
      toggleLogScale(logScaleElem.value)
    } else {
      logScaleElem.checked = true
      toggleLogScale(logScaleElem.value)
    }



  })
