import {
  BeautifulData
} from './beautifulData.js'

let flamengo_brasileirao_pts
let winner_brasileirao_pts
let linechart = new BeautifulData({
  selector: '#linechart',
  type: 'linechart',
  width: 400,
  height: 400,
  position_x: 100,
  position_y: 100,
  top: 100,
  bottom: 100,
  left: 100,
  right: 100,
  label_x: 'AleatorioX',
  label_y: 'AleatorioY',
  style: {
    'background-color': '#ffaaaa',
    'border': '.5rem solid #a0a0a0',
  },
  extra: {
    stroke: '#ff0000'
  }
});
async function main() {
  winner_brasileirao_pts = await d3.csv('./data/brasileiraowinner.csv', d => {
    return {
      y: d.value,
      x: d.label,
      fill: d.fill,
      team: d.team
    }
  });
  linechart.updateData(winner_brasileirao_pts);
  flamengo_brasileirao_pts = await d3.csv('./data/brasileiraoflamengo.csv', d => {
    return {
      y: d.value,
      x: d.label,
      fill: d.fill
    }
  });
}
main()


jQuery("#br_data_line").on("click", function () {

  linechart.updateData(winner_brasileirao_pts);
});



jQuery("#flamengo_data_line").on("click", function () {

  linechart.updateData(flamengo_brasileirao_pts);
});