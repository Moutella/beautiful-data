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
  {value: 71, label: '2017', fill: '#00aaaa'},
  {value: 80, label: '2018'},
  {value: 90, label: '2019'},
]

let flamengo_brasileirao_pts = [
  {value: 10, label: '2006'},
  {value: 20, label: '2007'},
  {value: 30, label: '2008'},
  {value: 40, label: '2009'},
  {value: 50, label: '2010'},
  {value: 60, label: '2012'},
  {value: 70, label: '2013'},
  {value: 80, label: '2014'},
  {value: 90, label: '2015'},
  {value: 100, label: '2077'},
]
async function bar_chart_function(bar_chart) {
  bar_chart.updateData(winner_brasileirao_pts);
  
}

let bar_chart = new BeautifulData({
  selector: '#barchart',
  type: 'barchart',
  width: 400,
  height: 400,
  position_x: 100,
  position_y: 100,
  top: 100,
  bottom: 100,
  left: 100,
  right: 100,
  label_x: 'Ano',
  label_y: 'Pontuação',
  style: {
    'background-color': 'beige',
    'border': '.5rem solid #a0a0a0'
  },
  extra: {
    relative_thickness: 0.5,
    fill: '#ffaaaa'
  }
});

bar_chart_function(bar_chart);


jQuery("#new_data").on("click", function () {

  bar_chart.updateData(flamengo_brasileirao_pts);
});

jQuery("#new_params").on("click", function () {});