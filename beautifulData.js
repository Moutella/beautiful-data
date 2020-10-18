class BeautifulData {
  constructor(selector, height, width, label_x, label_y, style = {}) {
    this.height = height || 800
    this.width = width || 600
    this.svg = d3.select(selector)
      .append("svg")
      .attr('width', this.height )
      .attr('height', this.width)
    if(!style['background-color']) this.svg.style('background-color', 'white');
    Object.entries(style).forEach(([key, value]) => {
      this.svg.style(key, value)
    });
    this.label_x = label_x || 'X'
    this.label_y = label_y || 'Y'
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

}