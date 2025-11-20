import { type BreadcrumbItem } from "@/types";
import {usePage,router} from "@inertiajs/react";
import {Card}from"@/components/ui/card";
import { Button } from "@headlessui/react";
import { Dialog,DialogContent,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";

interface Teacher {
    tenant_id: number;
    first_name: string;
    last_name: string;
    subject: string;
    phone?: string;
    [key: string]: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Teachers",
        href: "/teachers",
    },
];

const emptyForm: Teacher = {
    first_name: "",
    last_name: "",
    subject: "",
    phone: "",
    tenant_id: 0
};
type FormState = typeof emptyForm | (Teacher & { tenant_id: number });
export default function TeacherIndex() {
    const { teachers } = usePage<{ teachers: Teacher[] }>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formState, setFormState] = useState<FormState>(emptyForm);
    const [isEditMode, setIsEditMode] = useState(false);

    const openCreateDialog = () => {
        setFormState(emptyForm);
        setIsEditMode(false);
        setIsDialogOpen(true);
    };

    const openEditDialog = (teacher: Teacher) => {
        setFormState(teacher);
        setIsEditMode(true);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setFormState(emptyForm);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
            router.put(`/teachers/${(formState as Teacher).teacher_id}`, formState, {
                onSuccess: () => closeDialog(),
            });
        } else {
            router.post('/teachers', formState, {
                onSuccess: () => closeDialog(),
            });
        }
    };

    const handleDelete = (teacher: Teacher) => {
        if (confirm("Are you sure you want to delete this teacher?")) {
            router.delete(`/teachers/${teacher.teacher_id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold">Teachers</h1>
                    <Button
                        onClick={openCreateDialog}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        <PlusIcon className="size-4" />
                        Add Teacher
                    </Button>
                </div>
                <Card className="overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>

                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teachers.map((teacher) => (
                                <tr key={teacher.teacher_id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{teacher.teacher_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{teacher.first_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{teacher.last_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{teacher.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{teacher.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <Button
                                            onClick={() => openEditDialog(teacher)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            <PencilIcon className="size-4" />
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(teacher)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <TrashIcon className="size-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

                <Dialog open={isDialogOpen}>
                    <DialogContent onPointerDownOutside={closeDialog} onEscapeKeyDown={closeDialog}>
                        <DialogHeader>
                            <DialogTitle>{isEditMode ? "Edit Teacher" : "Add Teacher"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={formState.first_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    value={formState.last_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    value={formState.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formState.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    onClick={closeDialog}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    {isEditMode ? "Update" : "Create"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}