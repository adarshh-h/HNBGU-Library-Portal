import { useState } from 'react'
import { issueAPI, historyAPI } from '../../api/services'
import {
  Alert, Spinner, EmptyState, StatusBadge,
  ResponsiveData, DataCards, DataCard, DataCardGrid, DataField,
} from '../../components/ui'
import { Search, History } from 'lucide-react'

export default function HistoryPage() {
  const [rollInput, setRollInput] = useState('')
  const [student, setStudent]     = useState(null)
  const [history, setHistory]     = useState([])
  const [err, setErr]             = useState('')
  const [loading, setLoading]     = useState(false)

  const search = async () => {
    if (!rollInput.trim()) return
    setLoading(true); setErr(''); setStudent(null); setHistory([])
    try {
      const { data: sd } = await issueAPI.getStudentByRoll(rollInput.trim())
      setStudent(sd.student)
      const { data: hd } = await historyAPI.getHistory(sd.student._id)
      setHistory(hd.transactions || hd.history || [])
    } catch (e) { setErr(e.response?.data?.message || 'Student not found') }
    finally { setLoading(false) }
  }

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  return (
    <div className="animate-in page-container">
      <div className="page-header">
        <h1 className="page-title">Issue History</h1>
        <p className="page-subtitle">View complete borrowing history for any student</p>
      </div>

      <div className="card p-4 sm:p-6 mb-6 w-full max-w-lg">
        <div className="flex flex-col sm:flex-row gap-2">
          <input className="input flex-1" placeholder="Enter roll number" value={rollInput}
            onChange={e => setRollInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()} />
          <button type="button" onClick={search} disabled={loading} className="btn-primary px-4 justify-center sm:w-auto w-full">
            {loading ? <Spinner size="sm" /> : <Search className="h-4 w-4" />}
          </button>
        </div>
        <Alert type="error" message={err} />
        {student && (
          <div className="mt-4 p-3 rounded-lg" style={{background:"var(--bg-surface-2)",border:"1px solid var(--border)"}}>
            <p className="font-medium text-sm text-neutral-800 break-words">{student.name}</p>
            <p className="text-xs mt-0.5 break-words" style={{color:"var(--text-muted)"}}>{student.rollNumber} · {student.department} · {student.batch}</p>
          </div>
        )}
      </div>

      {student && (
        <div className="table-wrap">
          <div className="panel-header">
            <h3 className="font-serif font-semibold text-base" style={{color:"var(--text-primary)"}}>Transaction history</h3>
            <span className="badge-gray shrink-0">{history.length} records</span>
          </div>
          {history.length === 0 ? (
            <EmptyState icon={History} title="No history" description="This student has no borrowing records." />
          ) : (
            <ResponsiveData
              mobile={
                <DataCards>
                  {history.map((t, i) => (
                    <DataCard
                      key={i}
                      title={t.bookName}
                      subtitle={t.authorName}
                    >
                      <DataCardGrid>
                        <DataField label="Accession" value={<span className="font-mono text-xs px-2 py-0.5 rounded inline-block" style={{background:"var(--bg-surface-3)",color:"var(--text-primary)",border:"1px solid var(--border)"}}>{t.accessionNumber}</span>} />
                        <DataField label="Status" value={<StatusBadge returned={!!t.returnedAt} overdue={t.isOverdue} />} />
                        <DataField label="Issued" value={fmt(t.issueDate)} />
                        <DataField label="Due" value={fmt(t.dueDate)} />
                        <DataField label="Returned" value={fmt(t.returnedAt)} />
                      </DataCardGrid>
                    </DataCard>
                  ))}
                </DataCards>
              }
              desktop={
                <div className="table-scroll">
                  <table className="w-full">
                    <thead><tr>
                      {['Book','Accession','Issue Date','Due Date','Return Date','Status'].map(h => <th key={h} className="th">{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {history.map((t, i) => (
                        <tr key={i} className="transition-colors hover:bg-surface-hover">
                          <td className="td">
                            <p className="font-medium" style={{color:"var(--text-primary)"}}>{t.bookName}</p>
                            <p className="text-xs" style={{color:"var(--text-muted)"}}>{t.authorName}</p>
                          </td>
                          <td className="td"><span className="font-mono text-xs px-2 py-0.5 rounded" style={{background:"var(--bg-surface-3)",color:"var(--text-primary)",border:"1px solid var(--border)"}}>{t.accessionNumber}</span></td>
                          <td className="td">{fmt(t.issueDate)}</td>
                          <td className="td">{fmt(t.dueDate)}</td>
                          <td className="td">{fmt(t.returnedAt)}</td>
                          <td className="td">
                            <StatusBadge returned={!!t.returnedAt} overdue={t.isOverdue} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            />
          )}
        </div>
      )}
    </div>
  )
}
