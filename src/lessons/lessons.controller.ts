import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { Lesson } from '../models/lesson.model';

@Controller('api/lessons')
export class LessonsController {
    constructor(private lessonsService: LessonsService) {}

    @Get()
    getAll(): Promise<Lesson[]> {
        return this.lessonsService.findAll();
    }

    @Get(':id')
    getLesson(@Param('id') teacherId: number): Promise<Lesson> {
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
