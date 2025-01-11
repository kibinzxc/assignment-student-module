import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Post()
    async create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.create(createStudentDto);
    }

    @Get()
    async findAll() {
        return this.studentService.findAll();
    }

    // Fetch a student by ID
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.studentService.findOne(id);
    }
}
