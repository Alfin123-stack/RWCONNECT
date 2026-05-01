'use client'

import { AlertTriangle } from 'lucide-react'
import { Modal } from './Modal'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning' | 'info'
  loading?: boolean
}

const variantStyles = {
  danger:  'btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500',
  warning: 'btn-primary bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
  info:    'btn-primary',
}

const variantIcons = {
  danger:  'text-red-500 bg-red-50',
  warning: 'text-amber-500 bg-amber-50',
  info:    'text-blue-500 bg-blue-50',
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  variant = 'danger',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="p-6 text-center space-y-4">
        <div className={`w-14 h-14 rounded-2xl ${variantIcons[variant]} flex items-center justify-center mx-auto`}>
          <AlertTriangle className={`w-7 h-7 ${variantIcons[variant].split(' ')[0]}`} />
        </div>
        <div>
          <h3 className="font-display font-bold text-slate-900 text-lg">{title}</h3>
          <p className="text-slate-500 text-sm mt-1">{description}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1" disabled={loading}>
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 text-white ${variantStyles[variant]}`}
            disabled={loading}
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
