'use strict';

/* ─────────────────────────────────────
   CHART CONTROLLERS (Chart.js)
───────────────────────────────────── */

let chartsLoaded = false;

window.initDataCharts = function() {
  if (chartsLoaded) return; chartsLoaded = true;
  Chart.defaults.color = '#7a7268';
  Chart.defaults.font.family = "'DM Sans', sans-serif";
  Chart.defaults.font.size = 12;

  // Temp anomaly (Data Page)
  const chTemp = document.getElementById('ch-temp');
  if (chTemp) {
    const yrs = Array.from({length:45},(_,i)=>1980+i);
    const anom = yrs.map(y=>(+(( (y-1980)*0.028 + (Math.random()-.5)*0.28 ).toFixed(2))));
    new Chart(chTemp,{
      type:'line',
      data:{labels:yrs,datasets:[
        {label:'Anomaly °C',data:anom,borderColor:'#c0392b',backgroundColor:'rgba(192,57,43,0.07)',
         borderWidth:2,pointRadius:0,tension:0.35,fill:true},
        {label:'Zero',data:yrs.map(()=>0),borderColor:'rgba(0,0,0,0.15)',borderWidth:1,
         pointRadius:0,borderDash:[4,4]}
      ]},
      options:{responsive:true,maintainAspectRatio:false,
        plugins:{legend:{display:false}},
        scales:{x:{grid:{color:'rgba(0,0,0,0.04)'},ticks:{maxTicksLimit:8}},
                y:{grid:{color:'rgba(0,0,0,0.04)'},ticks:{callback:v=>`${v>0?'+':''}${v}°C`}}}}
    });
  }

  // Rainfall departure (Data Page)
  const chRain = document.getElementById('ch-rain');
  if (chRain) {
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const deps=[5,-8,3,12,-6,18,22,-4,-9,7,3,-2];
    new Chart(chRain,{
      type:'bar',
      data:{labels:months,datasets:[{
        label:'Departure %',data:deps,borderRadius:4,
        backgroundColor:deps.map(v=>v>=0?'rgba(41,128,185,0.75)':'rgba(192,57,43,0.7)')
      }]},
      options:{responsive:true,maintainAspectRatio:false,
        plugins:{legend:{display:false}},
        scales:{x:{grid:{color:'rgba(0,0,0,0.04)'}},y:{grid:{color:'rgba(0,0,0,0.04)'},ticks:{callback:v=>`${v}%`}}}}
    });
  }

  // Vulnerability (Data Page)
  const chVuln = document.getElementById('ch-vuln');
  if (chVuln) {
    const dists=['Gadchiroli','Sindhudurg','Ratnagiri','Raigad','Latur','Chandrapur',
                 'Beed','Yavatmal','Osmanabad','Nandurbar','Nagpur','Amravati'];
    const cvis=[8.2,7.8,7.5,7.1,6.9,6.8,6.4,6.3,6.0,5.9,5.6,5.4];
    new Chart(chVuln,{
      type:'bar',
      data:{labels:dists,datasets:[{
        label:'CVI',data:cvis,borderRadius:4,
        backgroundColor:cvis.map(v=>v>=7.5?'rgba(192,57,43,0.8)':v>=6.5?'rgba(181,101,29,0.8)':'rgba(30,78,58,0.7)')
      }]},
      options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
        plugins:{legend:{display:false}},
        scales:{x:{grid:{color:'rgba(0,0,0,0.04)'},max:10},y:{grid:{color:'rgba(0,0,0,0.04)'}}}}
    });
  }

  // District Table (Data Page)
  const dtbody = document.getElementById('dtbody');
  if (dtbody) {
    const rows=[
      {d:'Kolhapur',t:26.4,r:1200,fl:'Moderate',ls:'High',fi:'Low',dr:'Low'},
      {d:'Pune',t:27.1,r:700,fl:'Low',ls:'Low',fi:'Low',dr:'Moderate'},
      {d:'Nashik',t:26.0,r:600,fl:'Low',ls:'Low',fi:'Moderate',dr:'High'},
      {d:'Mumbai',t:28.5,r:900,fl:'High',ls:'Low',fi:'Low',dr:'Low'},
      {d:'Latur',t:29.2,r:600,fl:'Moderate',ls:'Low',fi:'High',dr:'High'},
      {d:'Sindhudurg',t:27.0,r:3600,fl:'High',ls:'High',fi:'Low',dr:'Low'},
      {d:'Gadchiroli',t:28.8,r:1400,fl:'High',ls:'Moderate',fi:'Moderate',dr:'Low'},
      {d:'Aurangabad',t:28.6,r:680,fl:'Low',ls:'Low',fi:'High',dr:'High'},
      {d:'Nagpur',t:29.4,r:1050,fl:'Moderate',ls:'Low',fi:'Moderate',dr:'Low'},
      {d:'Amravati',t:28.9,r:860,fl:'Moderate',ls:'Low',fi:'Moderate',dr:'Moderate'},
    ];
    const cls={High:'b-high',Moderate:'b-med',Low:'b-low'};
    rows.forEach(r => {
      dtbody.innerHTML+=`<tr>
        <td><strong>${r.d}</strong></td>
        <td style="font-family:var(--font-mono)">${r.t}</td>
        <td style="font-family:var(--font-mono)">${r.r}</td>
        <td><span class="badge ${cls[r.fl]}">${r.fl}</span></td>
        <td><span class="badge ${cls[r.ls]}">${r.ls}</span></td>
        <td><span class="badge ${cls[r.fi]}">${r.fi}</span></td>
        <td><span class="badge ${cls[r.dr]}">${r.dr}</span></td>
      </tr>`;
    });
  }

  // Publications Doughnut (Research Page)
  const chPubs = document.getElementById('ch-pubs');
  if (chPubs) {
    new Chart(chPubs,{
      type:'doughnut',
      data:{
        labels:['Landslide Mapping','Drought Assessment','LULC Analysis','Forest Fire','Flood Modeling','Climate Scenario'],
        datasets:[{data:[2,2,1,1,1,1],
          backgroundColor:['#8B4513','#b8860b','#5b2c6f','#c0392b','#2980b9','#1e4d3a'],
          borderWidth:0,hoverOffset:5}]
      },
      options:{responsive:true,maintainAspectRatio:false,
        plugins:{legend:{position:'right',labels:{boxWidth:12,padding:10,font:{size:11}}}}}
    });
  }
};

document.addEventListener('DOMContentLoaded', () => { setTimeout(window.initDataCharts, 100); });
