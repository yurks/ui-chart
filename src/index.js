import Node from './components/node';
import Chart from './components/chart';

export function uiChart(el, data) {
  const wrpr = new Node();
  wrpr.addChild(new Chart(data));
  el.appendChild(wrpr.create())
}

