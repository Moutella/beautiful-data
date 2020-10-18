const d3 = window.d3

export class BeautifulData {
  constructor(selector, type, width, height, margin_x, margin_y, label_x, label_y, style = {}, extra_params = {}) {
    this.margin_x = margin_x || 0;
    this.data = [];
    this.margin_y = margin_y || 0;
    this.bins = [];
    this.width = width || 800;
    this.height = height || 600;
    this.extra_params = extra_params
    this.svg = d3.select(selector)
      .append("svg")
      .attr('width', this.width)
      .attr('height', this.height)


    Object.entries(style).forEach(([key, value]) => {
      this.svg.style(key, value);
    });
    this.label_x = label_x || 'X';
    this.label_y = label_y || 'Y';
    this.fill = extra_params.fill ? extra_params.fill:'#ffffff';
    extra_params = {
      relative_thickness: extra_params.relative_thickness? extra_params.relative_thickness : 1
    }
  }

  randomDots(amount) {
    for (let id = 0; id < amount; id++) {
      let x = Math.random() * this.height;
      let y = Math.random() * this.width;
      let r = Math.random() * 20 + 10;

      let c = this.createCircle(x, y, r);

      c.style('fill', getRandomColor());
    }
  }
  updateData(data) {

  }
  createCircle(x, y, r) {
    let circle = this.svg.append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', r);

    return circle;
  }

  
  addData(data) {
    this.bins=data;
    this.y = d3.extent(this.bins);
  }
  update_params(width, height, margin_x, margin_y, label_x, label_y, style = {}, extra_params = {}){
    this.margin_x = margin_x || 0;
    this.data = [];
    this.margin_y = margin_y || 0;
    this.bins = [];
    this.width = width || 800;
    this.height = height || 600;
    this.extra_params = extra_params
    

    Object.entries(style).forEach(([key, value]) => {
      this.svg.style(key, value);
    });
    this.label_x = label_x || 'X';
    this.label_y = label_y || 'Y';
    this.fill = extra_params.fill ? extra_params.fill:'#ffffff';
    extra_params = {
      relative_thickness: extra_params.relative_thickness? extra_params.relative_thickness : 1
    }
  }
  render() {
    let maxValue = Math.max(...this.bins)
    let actualHeight = this.height - this.margin_y;
    let actualWidth = this.width - this.margin_x;
    this.svg.selectAll('rect')
      .data(this.bins)
      .join('rect')
      .transition()
      .duration(2000)
      .attr('width' , () => actualWidth / this.bins.length * (this.extra_params.relative_thickness || 1) )
      .attr('x', (d, i) => {
        let x = i * actualWidth / this.bins.length
        x += (actualWidth / this.bins.length)/2 * (1 - this.extra_params.relative_thickness || 1)
        x += this.margin_x /2 
        return  x
      })
      .attr('height' , d => actualHeight/maxValue * d)
      .attr('y', d => actualHeight - (actualHeight/maxValue * d) + this.margin_y/2)
      .style('fill', this.fill)
    }
  updateFill(color){
    this.fill = color;
  }
  updateData() {
    
  }
  

}