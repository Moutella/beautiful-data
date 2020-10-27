import {
  BeautifulData
} from './beautifulData.js'

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function createRandomCircles(length) {
  let circles = Array.from({
    length: length
  }, () => {
    return {
      cx: Math.floor(Math.random() * 1000),
      cy: Math.floor(Math.random() * 1000),
      col: Math.floor(Math.random() * 1000),
      r: Math.floor(Math.random() * 15),
      fill: getRandomColor()
    }
  })
  return circles;
}

let scatterplot = new BeautifulData({
  selector: '#scatterplot',
  type: 'scatterplot',
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
    'background-color': '#aaaaff',
    'border': '.5rem solid #a0a0a0'
  },
  extra: {
    start_minimum_value_x: true,
    fill: '#000000'
  }
});
let all_br_points;
async function main(){
  let middle = await d3.csv('./data/todaspontuacoesbr.csv', d => {
    let retorno = []
    for (let data of Object.entries(d)){
      let ano = parseInt(data[0])
      if (ano && data[1]){
        retorno.push({cx: ano, cy: data[1]})
      }
    }
    return retorno
  });
  all_br_points = middle.flat();
  scatterplot.updateData(all_br_points);
}

main()


jQuery("#random_data_scatter").on("click", function () {

  scatterplot.updateData(createRandomCircles(Math.random() * 20));
});

jQuery("#br_data_scatter").on("click", function () {

  scatterplot.updateData(all_br_points);
});