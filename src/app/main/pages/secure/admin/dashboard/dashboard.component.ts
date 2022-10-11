import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '@core/services/admin-services/dashboard.service';
import { colors } from 'app/colors.const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('statisticsLineChartRef') statisticsLineChartRef: any;
  @ViewChild('statisticsBarChartRef') statisticsBarChartRef: any;
  public statisticsLine;
  private $trackBgColor = '#EBEBEB';
  public data;
  public isMenuToggled = true;
  constructor(private _dashboardService: DashboardService) {
 // Statistics Line Chart
 this.statisticsLine = {
  chart: {
    height: 70,
    type: 'line',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  grid: {
    // show: true,
    borderColor: this.$trackBgColor,
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    },
    padding: {
      // left: 0,
      // right: 0,
      top: -30,
      bottom: -10
    }
      },
      stroke: {
        width: 3
      },
      colors: [colors.solid.info],
      series: [
        {
          data: [0, 20, 5, 30, 15, 45]
        }
      ],
      markers: {
        size: 2,
        colors: colors.solid.info,
        strokeColors: colors.solid.info,
        strokeWidth: 2,
        strokeOpacity: 1,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 5,
            fillColor: '#ffffff',
            strokeColor: colors.solid.info,
            size: 5
          }
        ],
        shape: 'circle',
        radius: 2,
        hover: {
          size: 3
        }
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '0px'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      tooltip: {
        x: {
          show: false
        }
      }
  };
    this.statisticsLine.chart.width = this.statisticsLineChartRef?.nativeElement.offsetWidth;
   }

  ngOnInit(): void {

    // Get the dashboard service data
    this._dashboardService.onApiDataChanged.subscribe(response => {
      this.data = response;
    });
  }

}
