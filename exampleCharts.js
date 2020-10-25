import {
  BeautifulData
} from './beautifulData.js'

let winner_brasileirao_pts = [
  {value: 78, label: '2006'},
  {value: 77, label: '2007'},
  {value: 75, label: '2008'},
  {value: 67, label: '2009'},
  {value: 71, label: '2010'},
  {value: 71, label: '2012'},
  {value: 77, label: '2013'},
  {value: 76, label: '2014'},
  {value: 80, label: '2015'},
  {value: 81, label: '2016'},
  {value: 71, label: '2017'},
  {value: 80, label: '2018'},
  {value: 90, label: '2019'},
]
async function bar_chart_function(bar_chart) {

  bar_chart.addData(winner_brasileirao_pts);
  bar_chart.createScales();
  bar_chart.createAxis();
  bar_chart.render();
}

let bar_chart = new BeautifulData({
  selector: '#barchart',
  type: 'barchart',
  width: 600,
  height: 400,
  position_x: 50,
  position_y: 50,
  top: 100,
  bottom: 100,
  left: 50,
  right: 50,
  label_x: 'Xis',
  label_y: 'Ipsiloni',
  style: {
    'background-color': '#aaffaa',
    'border': '.5rem solid #a0a0a0'
  },
  extra: {
    relative_thickness: 0.5,
    fill: '#ffaaaa'
  }
});

bar_chart_function(bar_chart);


jQuery("#new_data").on("click", function () {

  let new_data = Array.from({
    length: winner_brasileirao_pts.length
  }, () => Math.floor(Math.random() * 100))
  bar_chart.addData(new_data);
  bar_chart.createScales();
  bar_chart.createAxis();
  bar_chart.render()
});

jQuery("#new_params").on("click", function () {});