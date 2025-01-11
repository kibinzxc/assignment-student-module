import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';


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


    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateStudentDto: UpdateStudentDto,
    ) {
        const updatedStudent = await this.studentService.update(id, updateStudentDto);

        // If the student doesn't exist, the service will throw an error
        if (!updatedStudent) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }

        return updatedStudent;
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.studentService.remove(id);
        return { message: `Student with ID ${id} has been successfully deleted.` };
    }
}
