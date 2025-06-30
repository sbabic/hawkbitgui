import axiosInstance from '@/lib/axios';
import { GetSystemConfigurationOutput, GetSystemConfigurationResponse, HawkbitSystemConfigKey } from '@/services/system-configuration-service.types';

export class SystemConfigurationService {
  static async getSystemConfiguration(): Promise<GetSystemConfigurationOutput> {
    try {
      const response = await axiosInstance.get<GetSystemConfigurationResponse>(`/system/configs`);
      return response.data;
    } catch (error) {
      console.error('Failed to get system configuration', error);
      throw error;
    }
  }

  static async updateSystemConfiguration(configs: Partial<Record<HawkbitSystemConfigKey, string | number | boolean>>): Promise<void> {
    try {
      await axiosInstance.put(`/system/configs`, configs);
    } catch (error) {
      console.error('Failed to update system configuration', error);
      throw error;
    }
  }
}
