import React from 'react';
import { Message, useToaster } from 'rsuite';
import { PlacementType } from 'rsuite/esm/toaster/ToastContainer';

interface NotifProps {
  placement?: PlacementType;
  values?: any;
  withHeader?: boolean;
  isCustomMessage?: boolean;
}

interface NotifShowProps {
  type?: 'info' | 'error' | 'success' | 'warning';
  placement?: PlacementType;
  header?: any;
}

export const useToast = () => {
  const toaster = useToaster();

  const show = (message: any, options?: NotifShowProps) => {
    toaster.push(
      React.createElement(Message, { header: options?.header, type: options?.type || 'info', showIcon: true }, message),
      {
        placement: options?.placement || 'topEnd',
        duration: 3000,
      },
    );
  };

  const success = (message: any, options?: NotifProps) => {
    toaster.push(
      React.createElement(
        Message,
        {
          type: 'success',
          header: options?.withHeader !== false && React.createElement('div', {}, `Success`),
          showIcon: true,
        },
        message,
      ),
      { placement: options?.placement || 'topEnd', duration: 3000 },
    );
  };

  const error = (message?: string, options?: NotifProps) => {
    toaster.push(
      React.createElement(
        Message,
        {
          header: options?.withHeader !== false && React.createElement('div', {}, `Error`),
          type: 'error',
          showIcon: true,
        },
        React.createElement('div', {}, message),
      ),
      { placement: options?.placement || 'topEnd', duration: 3000 },
    );
  };

  const errorCustom = (message: any, options?: NotifProps) => {
    toaster.push(
      React.createElement(
        Message,
        {
          header: options?.withHeader !== false && React.createElement('div', {}, `Error`),
          type: 'error',
          showIcon: true,
        },
        message,
      ),
      { placement: options?.placement || 'topEnd', duration: 3000 },
    );
  };

  return { show, success, error, errorCustom };
};
