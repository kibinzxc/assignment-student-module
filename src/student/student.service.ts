import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) { }

    async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const student = this.studentRepository.create(createStudentDto);
        return this.studentRepository.save(student);
    }

    // Find all students
    async findAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    // Find one student by ID
    async findOne(id: number): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { id } });

        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }

        return student;
    }

    async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
        // Check if the student exists
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }

        try {
            // Merge the updates into the existing entity
            const updatedStudent = this.studentRepository.merge(student, updateStudentDto);

            // Save the updated entity
            return await this.studentRepository.save(updatedStudent);
        } catch (error) {
            throw new BadRequestException('Failed to update student. Please check your input.');
        }
    }

    async remove(id: number): Promise<void> {
        const deleteResult = await this.studentRepository.delete(id);
        if (!deleteResult.affected) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
    }

}
