import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './AuthContext';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from Supabase for current user
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  // Subscribe to real-time changes for current user
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`transactions-${user.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'transactions',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        console.log('Change received!', payload);
        fetchTransactions(); // Refetch data on any change
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add transaction
  const addTransaction = async (transaction) => {
    if (!user) return;

    try {
      const transactionWithUser = {
        ...transaction,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('transactions')
        .insert([transactionWithUser])
        .select();

      if (error) throw error;
      // Data will be updated via real-time subscription
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      // Data will be updated via real-time subscription
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Update transaction
  const updateTransaction = async (id, updatedTransaction) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .update(updatedTransaction)
        .eq('id', id);

      if (error) throw error;
      // Data will be updated via real-time subscription
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const value = {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
