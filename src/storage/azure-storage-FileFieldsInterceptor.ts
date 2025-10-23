import {
    AzureStorageOptions,
    AzureStorageService,
  } from '@nestjs/azure-storage';
  import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    mixin,
    NestInterceptor,
    Type,
  } from '@nestjs/common';
  import {
    FileFieldsInterceptor,
    FileInterceptor,
  } from '@nestjs/platform-express';
  import {
    MulterField,
    MulterOptions,
  } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
  import { Observable } from 'rxjs';
  
  export interface FileInterface {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    filename: string;
    buffer: string;
  }
  
  export function AzureStorageFileFieldsInterceptor(
    uploadFields: MulterField[],
    localOptions?: MulterOptions,
    azureStorageOptions?: Partial<AzureStorageOptions>,
  ): Type<NestInterceptor> {
    @Injectable()
    class MixinInterceptor implements NestInterceptor {
      interceptor: NestInterceptor;
      constructor(private readonly azureStorage: AzureStorageService) {
        this.interceptor = new (FileFieldsInterceptor(
          uploadFields,
          localOptions,
        ))();
      }
  
      async intercept(
        context: ExecutionContext,
        next: CallHandler,
      ): Promise<Observable<FileInterface>> {
        (await this.interceptor.intercept(context, next)) as Observable<any>;
        const request = context.switchToHttp().getRequest();
        Object.keys(request.files).forEach(async (key) => {
          const file = request.files[key][0];
          if (!file) {
            Logger.warn(
              'AzureStorageFileFiledInterceptor',
              `Can not intercept field "${key}". Did you specify the correct field name in @AzureStorageFileInterceptor('${key}')?`,
            );
          }
          const storageUrl = await this.azureStorage.upload(file);
          file.storageUrl = storageUrl;
        });
  
        return next.handle();
      }
    }
  
    const Interceptor = mixin(MixinInterceptor);
    return Interceptor as Type<NestInterceptor>;
  }
  