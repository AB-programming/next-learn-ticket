interface Topic {
    id: string;
    userId: string;
    avatar: string;
    content: string;
    images: string[];
    options: Array<{key: string, value: number}>
}

interface Record {
    id: string;
    topicId: string;
    userId: string;
    choice: string;
}

export {type Topic, type Record}