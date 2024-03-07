 function applyFilters(responses, filters) {
   
    return responses.filter(response => {
        return filters.every(filter => {
            
            switch (filter.condition) {
                case 'equals':
                   
                    return response.questions.filter((question)=>{ return question.type!='DatePicker' ? question.value===filter.value :  new Date(question.value).getTime() === new Date(filter.value).getTime()})
                case 'does_not_equal':
                    return response.questions.filter((question)=>{ return question.type!='DatePicker' ? question.value!==filter.value : new Date(question.value).getTime() !== new Date(filter.value).getTime()})
                case 'greater_than':
                    return response.questions.filter((question)=>{ return question.type!='DatePicker' ? question.value>=filter.value : new Date(question.value).getTime() >= new Date(filter.value).getTime()})
                case 'less_than':
                    return response.questions.filter((question)=>{ return question.type!='DatePicker' ? question.value<=filter.value : new Date(question.value).getTime() <= new Date(filter.value).getTime()})
                default:
                    return false;
            }
        });
    });
}

 function verifyDatePicker(question, filter) {
    return new Date(question.value).getTime() === new Date(filter.value).getTime()
}
module.exports = { applyFilters, verifyDatePicker };
