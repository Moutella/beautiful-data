import {
  BeautifulData
} from './beautifulData.js'

let flamengo_brasileirao_pts = [
  {y: 10, x: 2006},
  {y: 20, x: 2007},
  {y: 30, x: 2008},
  {y: 40, x: 2009},
  {y: 50, x: 2010},
  {y: 50, x: 2011},
  {y: 60, x: 2012},
  {y: 70, x: 2013},
  {y: 80, x: 2014},
  {y: 90, x: 2015},
  {y: 100, x: 2016},
]
let winner_brasileirao_pts = [
  {y: 78, x: 2006},
  {y: 77, x: 2007},
  {y: 75, x: 2008},
  {y: 67, x: 2009},
  {y: 71, x: 2010},
  {y: 71, x: 2012},
  {y: 77, x: 2013},
  {y: 76, x: 2014},
  {y: 80, x: 2015},
  {y: 81, x: 2016},
  {y: 71, x: 2017, fill: '#00aaaa'},
  {y: 80, x: 2018},
  {y: 90, x: 2019},
]
let scatterplot = new BeautifulData({
  selector: '#linechart',
  type: 'linechart',
  width: 300,
  height: 300,
  position_x: 10,
  position_y: 10,
  top: 150,
  bottom: 150,
  left: 150,
  right: 150,
  label_x: 'AleatorioX',
  label_y: 'AleatorioY',
  style: {
    'background-color': '#ffaaaa',
    'border': '.5rem solid #a0a0a0'
  },
  extra: {
    fill: '#ffaaaa'
  }
});
scatterplot.updateData(flamengo_brasileirao_pts);



jQuery("#new_data_line").on("click", function () {
  
  scatterplot.updateData(winner_brasileirao_pts);
});