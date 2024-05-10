import { sql } from '@vercel/postgres'; // Mocked for testing
import { createInvoice, deleteInvoice } from '../lib/actions';

describe('createInvoice', () => {
  const mockCreateSQL = jest.fn(() => Promise.resolve());
  jest.mock('@vercel/postgres', () => ({
    sql: mockCreateSQL, // Mock successful execution
  }));

  it('returns errors for invalid form data', async () => {
    const formData = new FormData();
    formData.append('amount', '-10');

    const response = await createInvoice({}, formData);

    expect(response.errors).toBeDefined();
    expect(response.message).toBe('Missing Fields. Failed to Create Invoice.');
    expect(sql).not.toHaveBeenCalled(); // No database call for invalid data
  });

  it('creates an invoice and redirects on success', async () => {
    const formData = new FormData();
    formData.append('customerId', 'customer-123');
    formData.append('amount', '100');
    formData.append('status', 'paid');

    const response = await createInvoice({}, formData);

    expect(response.errors).toBeUndefined();
    expect(response.message).toBeUndefined();
    expect(sql).toHaveBeenCalledWith(
      // Verify SQL call construction
      expect.stringContaining('INSERT INTO invoices'),
      expect.objectContaining({
        customerId: 'customer-123',
        amount: 10000, // Converted to cents
        status: 'paid',
      }),
    );
  });

  it('handles database errors', async () => {
    const formData = new FormData();
    formData.append('customerId', 'customer-123');
    formData.append('amount', '100');
    formData.append('status', 'paid');

    mockCreateSQL.mockImplementationOnce(() =>
      Promise.reject(new Error('Database failure')),
    ); // Simulate error

    const response = await createInvoice({}, formData);

    expect(response.errors).toBeUndefined();
    expect(response.message).toBe('Database Error: Failed to Create Invoice.');
    expect(sql).toHaveBeenCalled();
  });
});

describe('deleteInvoice', () => {
  const mockDeleteSQL = jest.fn();
  jest.mock('@vercel/postgres', () => ({
    sql: mockDeleteSQL,
  }));
  it('deletes an invoice and returns a success message', async () => {
    const id = 'invoice-id';

    const response = await deleteInvoice(id);

    expect(response.message).toBe('Deleted Invoice.');
    expect(sql).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM invoices'),
      expect.objectContaining({ id }),
    );
    // Mocks for revalidatePath are not included, so its behavior cannot be tested here.
  });

  it('handles database errors', async () => {
    const id = 'invoice-id';

    mockDeleteSQL.mockImplementationOnce(() =>
      Promise.reject(new Error('Database failure')),
    ); // Simulate error

    const response = await deleteInvoice(id);

    expect(response.message).toBe('Database Error: Failed to Delete Invoice.');
    expect(sql).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM invoices'),
      expect.objectContaining({ id }),
    );
  });
});
