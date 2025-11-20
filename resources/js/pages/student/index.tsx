import { type BreadcrumbItem } from "@/types";
import {usePage,router} from "@inertiajs/react";
import {Card}from"@/components/ui/card";
import{ Button } from "@headlessui/react";
import { Dialog,DialogContent,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";

interface Student {
    student_id?: number;
    tenant_id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    grade: string;
    phone?: string;
    [key: string]: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Students",
        href: "/students",
    },
];

const emptyForm: Student = {
    first_name: "",
    last_name: "",
    date_of_birth: "",
    grade: "",
    phone: "",  
    tenant_id: 0
};
type FormState = typeof emptyForm | (Student & { tenant_id: number });
export default function StudentIndex() {
    const { students } = usePage<{ students: Student[] }>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formState, setFormState] = useState<FormState>(emptyForm);
    const [isEditMode, setIsEditMode] = useState(false);

    const openCreateDialog = () => {
        setFormState(emptyForm);
        setIsEditMode(false);
        setIsDialogOpen(true);
    };

    const openEditDialog = (student: Student) => {
        setFormState(student);
        setIsEditMode(true);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setFormState(emptyForm);
    };  
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
            router.put(`/students/${formState.student_id}`, formState, {
                onSuccess: () => {
                    closeDialog();
                },
            });
        } else {
            router.post("/students", formState, {
                onSuccess: () => {
                    closeDialog();
                },
            });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Students</h1>
                <Button
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={openCreateDialog}
                >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Student
                </Button>
            </div>
            <Card>
                <div className="overflow-x-auto"   >
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Level</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                            <tr key={student.student_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{student.student_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.first_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.last_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.date_of_birth}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.grade}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <Button
                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                        onClick={() => openEditDialog(student)}
                                    >
                                        <PencilIcon className="size-4" />
                                    </Button>
                                    <Button
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => {
                                            if (confirm("Are you sure you want to delete this student?")) {
                                                router.delete(`/students/${student.student_id}`);
                                            }
                                        } }
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? "Edit Student" : "Add Student"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formState.first_name}
                                onChange={handleInputChange}
                                required
                                className="mt-1 w-full" />
                        </div>
                        <div>
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formState.last_name}
                                onChange={handleInputChange}
                                required
                                className="mt-1 w-full" />
                        </div>
                        <div>
                            <Label htmlFor="date_of_birth">Date of Birth</Label>
                            <Input
                                type="date"
                                id="date_of_birth"
                                name="date_of_birth"
                                value={formState.date_of_birth}
                                onChange={handleInputChange}
                                required
                                className="mt-1 w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="grade">Grade</Label>
                            <Input
                                type="text"
                                id="grade"
                                name="grade"
                                value={formState.grade}
                                onChange={handleInputChange}
                                required
                                className="mt-1 w-full" />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formState.phone}
                                onChange={handleInputChange}
                                className="mt-1 w-full" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                onClick={closeDialog}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {isEditMode ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
            </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

