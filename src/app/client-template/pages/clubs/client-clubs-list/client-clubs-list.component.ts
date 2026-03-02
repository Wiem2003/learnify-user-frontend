import { Component, OnInit } from '@angular/core';

interface ClubItem {
  id: number;
  name: string;
  category: string;
  schedule: string;
  maxMembers: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-client-clubs-list',
  templateUrl: './client-clubs-list.component.html',
  styleUrl: './client-clubs-list.component.scss',
  standalone: false,
})
export class ClientClubsListComponent implements OnInit {
  clubs: ClubItem[] = [];
  filteredClubs: ClubItem[] = [];
  searchTerm = '';
  selectedCategory = '';

  ngOnInit(): void {
    this.clubs = [
      { id: 1, name: 'Speaking Club', category: 'Speaking Club', schedule: 'Mon & Wed 6pm', maxMembers: 20, description: 'Practice conversational English in a friendly group setting.', image: 'assets/academics/images/course-img-1.jpg' },
      { id: 2, name: 'Debate Club', category: 'Debate Club', schedule: 'Tue 7pm', maxMembers: 15, description: 'Sharpen your argumentation and public speaking skills.', image: 'assets/academics/images/course-img-2.jpg' },
      { id: 3, name: 'Writing Club', category: 'Writing Club', schedule: 'Thu 5pm', maxMembers: 12, description: 'Improve your written English with peer feedback.', image: 'assets/academics/images/course-img-1.jpg' },
    ];
    this.filteredClubs = [...this.clubs];
  }

  filterClubs(): void {
    this.filteredClubs = this.clubs.filter(club => {
      const matchesSearch = club.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || club.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}
