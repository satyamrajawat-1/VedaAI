import { create } from "zustand";
import type {
  Assignment,
  User,
  CreateAssignmentFormData,
  GeneratedPaper,
  QuestionTypeConfig,
} from "@/types";
import { assignmentApi, authApi } from "@/lib/api";
import { generateId } from "@/lib/utils";


interface AssignmentState {
  
  assignments: Assignment[];
  currentAssignment: Assignment | null;
  generatedPaper: GeneratedPaper | null;


  isLoading: boolean;
  isGenerating: boolean;
  error: string | null;

  
  formData: CreateAssignmentFormData;

  
  fetchAssignments: () => Promise<void>;
  fetchAssignment: (id: string) => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
  createAssignment: () => Promise<string | null>;


  setFormFile: (file: File | null) => void;
  setFormDueDate: (date: string) => void;
  setFormQuestionTypes: (types: QuestionTypeConfig[]) => void;
  setFormAdditionalInfo: (info: string) => void;
  resetForm: () => void;

  
  setGeneratedPaper: (paper: GeneratedPaper | null) => void;
  clearError: () => void;
}

const defaultFormData: CreateAssignmentFormData = {
  file: null,
  dueDate: "",
  questionTypes: [
    {
      id: generateId(),
      type: "Multiple Choice Questions",
      numberOfQuestions: 4,
      marksPerQuestion: 1,
    },
    {
      id: generateId(),
      type: "Short Questions",
      numberOfQuestions: 3,
      marksPerQuestion: 2,
    },
    {
      id: generateId(),
      type: "Diagram/Graph-Based Questions",
      numberOfQuestions: 5,
      marksPerQuestion: 5,
    },
    {
      id: generateId(),
      type: "Numerical Problems",
      numberOfQuestions: 5,
      marksPerQuestion: 5,
    },
  ],
  additionalInfo: "",
};

export const useAssignmentStore = create<AssignmentState>((set, get) => ({
  
  assignments: [],
  currentAssignment: null,
  generatedPaper: null,
  isLoading: false,
  isGenerating: false,
  error: null,
  formData: { ...defaultFormData },


  fetchAssignments: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await assignmentApi.getAll();
      set({ assignments: response.data.data, isLoading: false });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch assignments";
      set({ error: message, isLoading: false });
    }
  },

 
  fetchAssignment: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await assignmentApi.getById(id);
      set({
        currentAssignment: response.data.data,
        generatedPaper: response.data.data.generatedPaper || null,
        isLoading: false,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch assignment";
      set({ error: message, isLoading: false });
    }
  },

  
  deleteAssignment: async (id: string) => {
    try {
      await assignmentApi.delete(id);
      set((state) => ({
        assignments: state.assignments.filter((a) => a._id !== id),
      }));
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete assignment";
      set({ error: message });
    }
  },

  
  createAssignment: async () => {
    const { formData } = get();
    set({ isGenerating: true, error: null });

    try {
      const data = new FormData();

      if (formData.file) {
        data.append("material", formData.file);
      }

      data.append("dueDate", formData.dueDate);
      data.append("questionTypes", JSON.stringify(formData.questionTypes));
      data.append("additionalInfo", formData.additionalInfo);

      const response = await assignmentApi.create(data);
      const newAssignment = response.data.data;

      set((state) => ({
        assignments: [newAssignment, ...state.assignments],
        currentAssignment: newAssignment,
        generatedPaper: newAssignment.generatedPaper || null,
        isGenerating: false,
      }));

      return newAssignment._id;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create assignment";
      set({ error: message, isGenerating: false });
      return null;
    }
  },

 
  setFormFile: (file) =>
    set((state) => ({ formData: { ...state.formData, file } })),

  setFormDueDate: (dueDate) =>
    set((state) => ({ formData: { ...state.formData, dueDate } })),

  setFormQuestionTypes: (questionTypes) =>
    set((state) => ({ formData: { ...state.formData, questionTypes } })),

  setFormAdditionalInfo: (additionalInfo) =>
    set((state) => ({ formData: { ...state.formData, additionalInfo } })),

  resetForm: () => set({ formData: { ...defaultFormData }, generatedPaper: null }),


  setGeneratedPaper: (paper) => set({ generatedPaper: paper }),
  clearError: () => set({ error: null }),
}));



interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    schoolName: string;
    schoolLocation: string;
  }) => Promise<boolean>;
  fetchProfile: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,


  initAuth: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("vedaai_token");
      if (token) {
        set({ token, isAuthenticated: true });
      }
    }
  },


  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login({ email, password });
      const { token, user } = response.data.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("vedaai_token", token);
      }

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Login failed";
      set({ error: message, isLoading: false });
      return false;
    }
  },


  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.register(data);
      const { token, user } = response.data.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("vedaai_token", token);
      }

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      set({ error: message, isLoading: false });
      return false;
    }
  },

 
  fetchProfile: async () => {
    set({ isLoading: true });
    try {
      const response = await authApi.getProfile();
      set({ user: response.data.data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  logout: () => {
    authApi.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  clearError: () => set({ error: null }),
}));
