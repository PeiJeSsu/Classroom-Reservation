import React, { useState } from 'react';
import { Box } from '@mui/material';
import ClassroomQueryPaper from './ClassroomQueryPaper';
import ResultList from "./ResultList";

export default function ClassroomQuery() {
    const [floor, setFloor] = useState('');
    const [classroomCode, setClassroomCode] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Handle the search logic here
        console.log('Searching for:', { floor, classroomCode, searchQuery });
    };

    return (
        <Box>
            <ClassroomQueryPaper
                floor={floor}
                setFloor={setFloor}
                classroomCode={classroomCode}
                setClassroomCode={setClassroomCode}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
            />
            <ResultList />
        </Box>
    );
}
