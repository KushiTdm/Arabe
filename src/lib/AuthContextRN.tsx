import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base44 } from '../api/base44Client';
import { appParams } from './app-params';
import { createAxiosClient } from '@base44/sdk/dist/utils/axios-client';

interface User {
  id: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

interface AuthError {
  type: string;
  message: string;
}

interface AppPublicSettings {
  id: string;
  public_settings?: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isLoadingPublicSettings: boolean;
  authError: AuthError | null;
  appPublicSettings: AppPublicSettings | null;
  logout: (shouldRedirect?: boolean) => void;
  navigateToLogin: () => void;
  checkAppState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'base44_access_token',
  APP_ID: 'base44_app_id',
  FUNCTIONS_VERSION: 'base44_functions_version',
  APP_BASE_URL: 'base44_app_base_url',
};

// Helper function to check if running on web
const isWeb = (): boolean => {
  return Platform.OS === 'web';
};

// Helper function to get current URL (web only)
const getCurrentUrl = (): string | null => {
  if (isWeb() && typeof globalThis !== 'undefined') {
    try {
      // @ts-ignore - window exists on web platform
      return globalThis.location?.href || null;
    } catch {
      return null;
    }
  }
  return null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [appPublicSettings, setAppPublicSettings] = useState<AppPublicSettings | null>(null);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);
      
      // Get stored token
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      
      // Create app client for public settings
      const appClient = createAxiosClient({
        baseURL: `/api/apps/public`,
        headers: {
          'X-App-Id': appParams.appId
        },
        token: storedToken || appParams.token,
        interceptResponses: true
      });
      
      try {
        const publicSettings = await appClient.get(`/prod/public-settings/by-id/${appParams.appId}`);
        setAppPublicSettings(publicSettings);
        
        // If we got the app public settings successfully, check if user is authenticated
        if (storedToken || appParams.token) {
          await checkUserAuth();
        } else {
          setIsLoadingAuth(false);
          setIsAuthenticated(false);
        }
        setIsLoadingPublicSettings(false);
      } catch (appError: any) {
        console.error('App state check failed:', appError);
        
        // Handle app-level errors
        if (appError.status === 403 && appError.data?.extra_data?.reason) {
          const reason = appError.data.extra_data.reason;
          if (reason === 'auth_required') {
            setAuthError({
              type: 'auth_required',
              message: 'Authentication required'
            });
          } else if (reason === 'user_not_registered') {
            setAuthError({
              type: 'user_not_registered',
              message: 'User not registered for this app'
            });
          } else {
            setAuthError({
              type: reason,
              message: appError.message
            });
          }
        } else {
          setAuthError({
            type: 'unknown',
            message: appError.message || 'Failed to load app'
          });
        }
        setIsLoadingPublicSettings(false);
        setIsLoadingAuth(false);
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      setAuthError({
        type: 'unknown',
        message: error.message || 'An unexpected error occurred'
      });
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
    } catch (error: any) {
      console.error('User auth check failed:', error);
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
      
      // If user auth fails, it might be an expired token
      if (error.status === 401 || error.status === 403) {
        setAuthError({
          type: 'auth_required',
          message: 'Authentication required'
        });
      }
    }
  };

  const logout = async (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear stored tokens
    await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    
    // Use the SDK's logout method
    base44.auth.logout();
    
    if (shouldRedirect) {
      const loginUrl = appParams.appBaseUrl || 'https://base44.app';
      
      if (isWeb()) {
        // On web, use Linking which will work with the browser
        Linking.openURL(loginUrl);
      } else {
        // On native, we can use deep linking or WebBrowser
        Linking.openURL(loginUrl);
      }
    }
  };

  const navigateToLogin = () => {
    const loginUrl = appParams.appBaseUrl || 'https://base44.app';
    const currentUrl = getCurrentUrl();
    
    if (isWeb() && currentUrl) {
      base44.auth.redirectToLogin(currentUrl);
    } else {
      // On native, open the login URL
      // You might need to configure deep linking to return to the app
      Linking.openURL(loginUrl);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      logout,
      navigateToLogin,
      checkAppState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};