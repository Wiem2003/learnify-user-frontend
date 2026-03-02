import { Component, OnInit } from '@angular/core';

interface EventItem {
  id: number;
  title: string;
  category: string;
  date: Date;
  time: string;
  location: string;
  maxParticipants: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-client-events-list',
  templateUrl: './client-events-list.component.html',
  styleUrl: './client-events-list.component.scss',
  standalone: false,
})
export class ClientEventsListComponent implements OnInit {
  events: EventItem[] = [];
  filteredEvents: EventItem[] = [];
  searchTerm = '';
  selectedCategory = '';

  ngOnInit(): void {
    const now = new Date();
    this.events = [
      { id: 1, title: 'IELTS Workshop', category: 'Workshop', date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), time: '2:00 PM', location: 'Online', maxParticipants: 50, description: 'Prepare for your IELTS exam with expert tips and practice.', image: 'assets/academics/images/course-img-1.jpg' },
      { id: 2, title: 'Speaking Competition', category: 'Competition', date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), time: '4:00 PM', location: 'Main Hall', maxParticipants: 30, description: 'Showcase your speaking skills and win prizes.', image: 'assets/academics/images/course-img-2.jpg' },
      { id: 3, title: 'Business English Webinar', category: 'Webinar', date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), time: '6:00 PM', location: 'Online', maxParticipants: 100, description: 'Learn professional communication strategies.', image: 'assets/academics/images/course-img-1.jpg' },
    ];
    this.filteredEvents = [...this.events];
  }

  filterEvents(): void {
    this.filteredEvents = this.events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || event.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}
