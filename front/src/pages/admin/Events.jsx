import { useEffect, useState } from "react";
import { getEvents } from "../../api/events.js";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const registerSchema = z.object({

    id: z.number().optional(),
    title: z.string(),
    description: z.string().optional(),
    location: z.string().optional(),
    type: z.string(),
    event_date: z.string(),
})




function Events(){

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents().then((data) => {
        setEvents(data.data);
        });
    }, []);

    const { register, handleSubmit, setValue } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const columns = [

        {
            accessoryKey: "title",
            header: "Title",
        },
        {
            accessoryKey: "type",
            header: "Type",
            cell: ({ row }) => (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {row.getValue("type")}
                </span>
            ),
        },
        {
            accessoryKey: "location",
            header: "Location",
        },
        {
            accessoryKey: "event_date",
            header: "Date",
        },
        {
            accessoryKey: "description",
            header: "Description"
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const event = row.original;
                return (
                    <div className="flex gap-2 justify-end">
                        <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(user)}
                        >
                            Modifier
                        </Button>
                        <Button 
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(user.id)}
                        >
                            Supprimer
                        </Button>
                    </div>
                )
            }
        }
    ]


    return (
        <>
        
        <div>{events.title}</div>
        
        </>

    
)
}

export default Events;
