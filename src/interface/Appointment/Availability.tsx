interface TimeSlot {
    start_time: number;
    end_time: number;
    minutes: number;
    isAvailable: boolean;
}

interface SortedResponseItem {
    _id: string;
    teamMemberId: string;
    date: string;
    start_time_range: number;
    end_time_range: number;
    timeSlot: TimeSlot[];
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface SortedResponse {
    [date: string]: SortedResponseItem[];
}

interface BestTimeSlot {
    teamMemberId: string;
    start_time: number;
    end_time: number;
    minutes: number;
    error?: string;
}

export interface BestTimeSlotResponse {
    sortedResponse: SortedResponse;
    bestTimeSlots: BestTimeSlot[];
    error: any[];
}
