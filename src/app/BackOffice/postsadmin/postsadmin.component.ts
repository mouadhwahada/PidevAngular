import {Component, Inject, OnInit} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {PostService} from "../../Services/post.service";


@Component({
  selector: 'app-postsamin',
  templateUrl: './postsadmin.component.html',
  styleUrls: ['./postsadmin.component.css']
})
export class PostsadminComponent implements OnInit {
  posts: any[] = [];
  errorMessage: string = '';
  searchTerm: string = '';
  sortBy: string = '';
  totalPages: number = 0;
currentPage: number = 1;
itemsPerPage: number = 4;



 

 


  constructor(private postService: PostService ) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
    this.postService.getAllPosts().subscribe({
      next: (posts: any[]) => {
        this.posts = posts;
        this.posts = posts.slice(startIndex, endIndex);
        this.renderViewsChart();
        this.renderReactionsChart()
        this.totalPages = Math.ceil(posts.length / this.itemsPerPage);
        console.log('Successfully fetched posts', this.posts)
      },
      error: (error) => {
        this.errorMessage = 'Error fetching posts: ', error.message;
      }
    });
  }

  filterPosts() {
    if (!this.searchTerm) {
      this.getAllPosts();
      return;
    }
    this.posts = this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())||
      post.content.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sortPosts() {
    if (this.sortBy === 'asc') {
      this.posts.sort((a, b) => a.nbViews - b.nbViews);
    } else if (this.sortBy === 'des') {
      this.posts.sort((a, b) => b.nbViews - a.nbViews);
    }
  }

  deletePost(id: number) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe(() => {
        this.getAllPosts();
      });
    }
  }

  getReactionsCount(post: any): { likes: number; dislikes: number } {
    let likes = 0;
    let dislikes = 0;

    if (post.reactions) {
      post.reactions.forEach((reaction: any) => {
        if (reaction.typeReact === 'Like') {
          likes++;
        } else if (reaction.typeReact === 'Dislike') {
          dislikes++;
        }
      });
    }

    return { likes, dislikes };
  }


  renderReactionsChart(): void {
    const likesData = this.posts.map((post: any) => {
      const reactionsCount = this.getReactionsCount(post);
      return {
        x: post.title,
        y: reactionsCount.likes + reactionsCount.dislikes,
        z: reactionsCount.likes,
        name: post.title,
      };
    });

    const dislikesData = this.posts.map((post: any) => {
      const reactionsCount = this.getReactionsCount(post);
      return {
        x: post.title,
        y: reactionsCount.likes + reactionsCount.dislikes,
        z: reactionsCount.dislikes,
        name: post.title,
      };
    });

    const chartOptions = {
      series: [
        {
          name: 'Likes',
          data: likesData,
        },
        {
          name: 'Dislikes',
          data: dislikesData,
        },
      ],
      chart: {
        type: 'bubble',
        height: 350,
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0, 1],
        formatter: function (val: any, opts: any) {
          return opts.w.globals.seriesNames[opts.seriesIndex];
        },
        style: {
          fontSize: '12px',
        },
      },
      xaxis: {
        tickAmount: 6,
        type: 'category',
        labels: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
      yaxis: {
        tickAmount: 7,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      fill: {
        opacity: 1,
      },
      title: {
        text: 'Posts by reactions',
        align: 'left',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    const chartElement = document.querySelector('#reactionsChart');
    if (chartElement) {
      const chart = new ApexCharts(chartElement as HTMLElement, chartOptions);
      chart.render();
    }
  }

  renderViewsChart(): void {
    const chartOptions = {
      series: this.posts.map(post => post.nbViews),
      labels: this.posts.map(post => post.title),
      chart: {
        type: 'donut',
        height: 350
      },
      title: {
        text: 'Posts by views',
        align: 'left'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    const chartElement = document.querySelector('#viewsChart');
    if (chartElement) {
      const chart = new ApexCharts(chartElement as HTMLElement, chartOptions);
      chart.render();
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllPosts();
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllPosts();
    }
  }
  



}
