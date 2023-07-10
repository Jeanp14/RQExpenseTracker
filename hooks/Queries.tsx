import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';
import { storeExpense, fetchExpenses, updateExpense, deleteExpense } from '../util/http';

export const useGetExpenses = ({uid, onSuccess}: {uid: string, onSuccess: (data: any) => void}) => {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: () => fetchExpenses(uid),
        onSuccess: (data) => onSuccess(data),
        enabled: !!uid
    })
}

export const useStoreExpense = ({queryClient, uid, onSuccess}: {queryClient: QueryClient, uid: string, onSuccess: (id: string) => void}) => {
    return useMutation(storeExpense,{
        mutationKey: ['expenses'],
        onSuccess: (data) => onSuccess(data),
        onMutate: async ({expenseData, UID}) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['expenses'])
        
            // Snapshot the previous value
            const previousExpenses = queryClient.getQueryData(['expenses'])
        
            // Optimistically update to the new value
            queryClient.setQueryData(['expenses'], (old: any) => [...old, expenseData])
        
            // Return a context object with the snapshotted value
            return { previousExpenses }
          },
          // If the mutation fails, use the context returned from onMutate to roll back
          onError: (err, expense, context) => {
            queryClient.setQueryData(['expenses'], context?.previousExpenses)
          },
          // Always refetch after error or success:
          onSettled: () => {
            queryClient.invalidateQueries(['expenses'])
          },
    })
}

export const useUpdateExpense = ({queryClient, id, uid, onSuccess}: {queryClient: QueryClient, id: string, uid: string, onSuccess: () => void}) => {
    return useMutation(updateExpense, {
        mutationKey: ['expenses'],
        onMutate: async ({id, expenseData, UID}) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['expenses'])
        
            // Snapshot the previous value
            const previousExpense = queryClient.getQueryData(['expenses'])
        
            // Optimistically update to the new value
            queryClient.setQueryData(['expenses'], (old: any) => {old ? old.map((expense: any) => expense.id === id ? expenseData : expense) : []})
        
            // Return a context with the previous and new todo
            return { previousExpense }
          },
          // If the mutation fails, use the context we returned above
          onError: (err, expense, context) => {
            queryClient.setQueryData(
              ['expenses'],
              context?.previousExpense
            )
          },
          // Always refetch after error or success:
          onSettled: (expense) => {
            queryClient.invalidateQueries(['expenses'])
          },
        //onSuccess: onSuccess
    })
}

export const useDeleteExpense = ({queryClient, id, uid, onSuccess}: {queryClient: QueryClient, id: string, uid: string, onSuccess: () => void}) => {
    return useMutation(deleteExpense, {
        mutationKey: ['expenses'],
        //mutationFn: () => deleteExpense(id, uid),
        onMutate: async (expense) => {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          await queryClient.cancelQueries(['expenses'])
      
          // Snapshot the previous value
          const previousExpense = queryClient.getQueryData(['expenses'])
      
          // Optimistically update to the new value
          queryClient.setQueryData(['expenses'], (expenses: any) => { expenses ? expenses.filter((expense: any) => expense.id != id): []as any[]})
      
          // Return a context with the previous and new todo
          return { previousExpense, expense }
        },
        // If the mutation fails, use the context we returned above
        onError: (err, expense, context) => {
          queryClient.setQueryData(
            ['expenses'],
            context?.previousExpense
          )
        },
        // Always refetch after error or success:
        onSettled: (expense) => {
          queryClient.invalidateQueries(['expenses'])
        },
        onSuccess: onSuccess
    })
}