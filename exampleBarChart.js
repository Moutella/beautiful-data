import {
  BeautifulData
} from './beautifulData.js'

let winner_brasileirao_pts;
let flamengo_brasileirao_pts

async function bar_chart_function(bar_chart) {
  winner_brasileirao_pts = await d3.csv('./data/brasileiraowinner.csv', d => {
    return {
      value: d.value,
      label: d.label,
      fill: d.fill,
      team: d.team
    }
  });
  bar_chart.updateData(winner_brasileirao_pts);
  flamengo_brasileirao_pts = await d3.csv('./data/brasileiraoflamengo.csv', d => {
    return {
      value: d.value,
      label: d.label,
      fill: d.fill
    }
  });
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
    fill: '#000000'
  }
});

bar_chart_function(bar_chart);


jQuery("#flamengo_data").on("click", function () {

  bar_chart.updateData(flamengo_brasileirao_pts);
});

jQuery("#br_data").on("click", function () {

  bar_chart.updateData(winner_brasileirao_pts);
});
jQuery("#new_params").on("click", function () {});