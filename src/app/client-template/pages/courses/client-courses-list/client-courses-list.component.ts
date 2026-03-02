import { Component, OnInit } from '@angular/core';

interface CourseItem {
  id: number;
  title: string;
  category: string;
  level: string;
  description: string;
  duration: string;
  price: number;
  lessons: number;
  students: number;
  thumbnail?: string;
  image?: string;
}

@Component({
  selector: 'app-client-courses-list',
  templateUrl: './client-courses-list.component.html',
  styleUrl: './client-courses-list.component.scss',
  standalone: false,
})
export class ClientCoursesListComponent implements OnInit {
  courses: CourseItem[] = [];
  filteredCourses: CourseItem[] = [];
  searchTerm = '';
  selectedLevel = '';
  selectedCategory = '';

  ngOnInit(): void {
    this.courses = [
      { id: 1, title: 'Business English Masterclass', category: 'Business English', level: 'B2', description: 'Comprehensive business English course covering professional communication.', duration: '8 weeks', price: 199, lessons: 32, students: 1245, image: 'assets/academics/images/course-img-1.jpg', thumbnail: 'assets/academics/images/course-img-1.jpg' },
      { id: 2, title: 'Grammar Fundamentals', category: 'Grammar', level: 'A1', description: 'Perfect for beginners. Learn essential grammar rules from scratch.', duration: '6 weeks', price: 79, lessons: 24, students: 892, image: 'assets/academics/images/course-img-2.jpg', thumbnail: 'assets/academics/images/course-img-2.jpg' },
      { id: 3, title: 'Speaking with Confidence', category: 'Speaking', level: 'B1', description: 'Build fluency and confidence in spoken English.', duration: '10 weeks', price: 149, lessons: 40, students: 567, image: 'assets/academics/images/course-img-1.jpg', thumbnail: 'assets/academics/images/course-img-1.jpg' },
    ];
    this.filteredCourses = [...this.courses];
  }

  getLevelLabel(level: string): string {
    const map: Record<string, string> = { A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper Intermediate', C1: 'Advanced', C2: 'Proficient' };
    return map[level] || level;
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const levelLabel = this.getLevelLabel(course.level);
      const matchesSearch = course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesLevel = !this.selectedLevel || levelLabel === this.selectedLevel;
      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }
}
