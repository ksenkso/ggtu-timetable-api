import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from '../models/subject.model';

@Controller('api/subjects')
export class SubjectsController {
    constructor(private lessonsService: SubjectsService) {}

    @Get()
    getAll(): Promise<Subject[]> {
        return this.lessonsService.findAll();
    }

    @Get(':id')
    getLesson(@Param('id') teacherId: number): Promise<Subject> {
        return this.lessonsService.findOne(teacherId);
    }

    @Post()
    addLesson(@Body('name') name: string) {
        return this.lessonsService.create({name});
    }

    @Patch(':id')
    updateLesson(
        @Param('id') id: number,
        @Body('name') name: string
    ) {
        return this.lessonsService.update(id, {name});
    }

    @Delete(':id')
    deleteLesson(@Param('id') id: number) {
        return this.lessonsService.delete(id);
    }
}
