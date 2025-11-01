export interface User {
    id: string;
    username: string;
    email: string;
    image: string;
    dateOfBirth: string;
    joinDate: string;
    desc: string;
    role: {
        id: number;
        name: string;
    }
    cartDetail: [

    ],
    novels: NovelDataNoUser[]
}

export interface UserFull {
    id: string;
    username: string;
    email: string;
    image: string;
    dateOfBirth: string;
    joinDate: string;
    desc: string;
    role: {
        id: number;
        name: string;
    }
    cartDetail: [

    ],
    novels: NovelDataNoUser[];
    payment: Payment[];
    bookVotes: BookVote[];
    novelsVotes: NovelVote[];
    novelrecents: NovelRecent[];
}

export interface NovelVote {
    id: number,
    value: number,
    votedAt: string,
    novel: {
        id: number,
        title: string,
        image: string,
        novel_desc: string,
        view: number,
        like: number,
        numberofvote: number,
        createat: string,
    }
}

export interface BookVote {
    id: number,
    value: number,
    votedAt: string,
    book: {
        id: number,
        title: string,
        image: string,
        novel_desc: string,
        price: number,
        publisher: string,
        pages: number,
        author: {
            id: number,
            name: string
        },
        realeasedate: string,
        createat: string,
    }
}

export interface NovelRecent {
    id: number,
    novel: {
        id: number,
        title: string,
        image: string,
        novel_desc: string,
        view: number,
        like: number,
        numberofvote: number,
        createat: string,
        author: {
            id: number,
            name: string
        }
    },
    last_read_chapter_id: number,
    last_read_chapter_name: string,
    last_read_date: string,
    createat: string,
}
export interface NovelLike {
    id: number,
    novel: {
        id: number,
        title: string,
        image: string,
        novel_desc: string,
        view: number,
        like: number,
        numberofvote: number,
        createat: string,
        author: {
            id: number,
            name: string
        }
    },
}

export interface Payment {
    id: number,
    amount: number,
    createat: string,
    resultCode: number,
    message: string,
    orderId: string
}

export interface PaymentData {
    id: number,
    amount: number,
    createat: string,
    resultCode: number,
    message: string,
    orderId: string,
    user: {
        id: number,
        username: string,
        email: string,
        image: string
    },
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ChapterData {
    id: number;
    novel: {
        id: number,
        title: string,
        image: string,
        novel_desc: string,
        view: number,
        like: number,
        numberofvote: number,
        createat: string,
    };
    name: string;
    title: string;
    author: {
        id: number;
        name: string;
    };
    artist: {
        id: number;
        name: string;
    };
    poster: string;
    content: string;
}

export interface NovelData {
    id: number,
    title: string,
    image: string,
    novel_desc: string,
    view: number,
    like: number,
    numberofvote: number,
    createat: string,
    chapters: [
        {
            id: number,
            name: string,
            content: string,
            createat: string,
        }
    ],
    categories: [
        {
            id: number,
            name: string,
            desc: string
        }
    ],
    author: {
        id: number,
        name: string
    },
    artist: {
        id: number,
        name: string
    },
    user: {
        id: number,
        username: string,
        image: string
    }
}

export interface NovelDataNoUser {
    id: number,
    title: string,
    image: string,
    novel_desc: string,
    view: number,
    like: number,
    numberofvote: number,
    createat: string,
    chapters: [
        {
            id: number,
            name: string,
            content: string,
        }
    ],
    categories: [
        {
            id: number,
            name: string,
            desc: string
        }
    ],
    author: {
        id: number,
        name: string
    },
    artist: {
        id: number,
        name: string
    }
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export interface BookData {
    id: number,
    title: string,
    image: string,
    novel_desc: string,
    price: number,
    publisher: string,
    pages: number,
    author: {
        id: number,
        name: string
    },
    releasedate: string,
    createat: string,
    categories: [
        {
            id: number,
            name: string,
            desc: string,
            createat: string
        }
    ],
    votes: [
        {
            id: number,
            value: number,
            votedAt: string
        }
    ]
}

export interface CartData {
    id: number,
    quantity: number,
    createat: string,
    user: {
        id: number,
        username: string,
        email: string,
        image: string
    },
    book: {
        id: number,
        title: string,
        image: string,
        novel_desc: string,
        price: number,
        publisher: string,
        pages: number,
        realeasedate: string,
        createat: string,
        author: {
            id: number,
            name: string
        }
    }
}

export interface Category {
    id: string;
    name: string;
    children?: Category[];
}